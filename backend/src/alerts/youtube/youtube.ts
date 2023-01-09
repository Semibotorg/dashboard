/*
   {youtube.channel}
   {youtube.link}
   {youtube.title}
 */

import { Types } from "mongoose";
import { Idoc } from "../../models/alerts";
import alertHistorySchema from "../../models/alertsHistory";
import { client } from "../../bot";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { google } from 'googleapis';
import Parser from 'rss-parser'
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
export async function YoutubeAlert(dataB: Idoc | null){
  const parser = new Parser()
    const youtube  =  google.youtube({
        version: 'v3',
        auth: YOUTUBE_API_KEY!,
        
    })
    const data = dataB?.youtube
    try{
        const dataHistory = await alertHistorySchema.findOne({
            GuildId: dataB?.GuildId
          })
        data?.youtubeChannelName.forEach(async(username) => {
            if(!data || !username) return 
            if(!data.enabled) return 
            
            await youtube.channels.list({
                part:['snippet', 'statistics', 'contentDetails'],
                id:[username],
            },async(err, res) => {
                if (err) {
                    console.error(err);
                    return;
                  }
                  
                  let resItems = res?.data.items!
                  
                  const channelName = resItems[0].snippet?.title
                  const channelImageUrl = resItems[0].snippet?.thumbnails?.high?.url
                  const channelId: string = resItems[0].id!
                  if(!channelId) return
                  const ONE_MONTH_AGO = Date.now() - 30 * 24 * 60 * 60 * 1000;
                  const NOW = Date.now();
                  try{
                  const resVideos = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
                  
                  const video = resVideos.items[0]
                  if(!video) return
                  
                    
                    const videoLink = video.link!
                    const videoTitle = video.title!
                    const videoId = video.id.split(':')[2]!
                    const youtubeLogo = "https://img.icons8.com/color/48/null/youtube-play.png"
                    const videoThumbnail = `http://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`
                    if(!dataHistory) return
                    const historyFilter = dataHistory?.YoutubeHistory.filter(el => el == videoId)
    
                    if(historyFilter.length > 0) return
                    const channelDiscord: any = await client.channels.fetch(data.channelId);
                    if(!channelDiscord) return
                    let message = data.message
                    message = message.replace('{youtube.channel}', channelName as any)
                    message = message.replace('{youtube.link}', videoLink)
                    message = message.replace('{youtube.title}', videoTitle)
                    
                    const dataC = await alertHistorySchema.findOneAndUpdate({
                        GuildId: dataB.GuildId
                      },{
                        $push: {YoutubeHistory: videoId}
                      },{
                        upsert: true
                      })
                    await channelDiscord.send({content: message})
                  
                }catch(err){
                  console.log(err)
                }

            })
        })
    }catch(err){
        console.log(err)
    }
}