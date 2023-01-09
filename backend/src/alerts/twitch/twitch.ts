/*
    {stream.channel}
    {stream.link}
    {stream.title}
    {stream.game}
    {stream.views}
 */

import { Types } from "mongoose";
import { Idoc } from "../../models/alerts";
import alertHistorySchema from "../../models/alertsHistory";
import { client } from "../../bot";
import Twitch from "node-twitch";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
export async function TwitchAlert(dataB: Idoc | null){
    const twitchClient = new Twitch({
        client_id: TWITCH_CLIENT_ID!,
        client_secret: TWITCH_CLIENT_SECRET!
    })
    const data = dataB?.twitch
    try{
        data?.username.forEach(async(username) => {
            if(!data || !username) return 
            if(!data.enabled) return 
            const twitchUser = await twitchClient.getUsers(username)
            if(!twitchUser) return 
            const userId = twitchUser.data[0].id
            const twitchStream = await twitchClient.getStreams({channel: userId})
            const stream = twitchStream.data[0]
            const dataHistory = await alertHistorySchema.findOne({
                GuildId: dataB.GuildId
              })
            
            if(!stream) return 
            if(stream){
                let message = data.message
                const channel = stream.user_name
                const liveLink = `https://www.twitch.tv/${twitchUser.data[0].display_name}`
                const streamTitle = stream.title
                const streamGame = stream.game_name
                const streamViewerCount = stream.viewer_count
                const twitchGame = (await twitchClient.getGames(streamGame)).data[0]
                let gamePhoto = twitchGame.box_art_url
                gamePhoto = gamePhoto.replace('{width}', '60')
                gamePhoto = gamePhoto.replace('{height}', '80')
                
                if(!dataHistory) return
                const historyFilter = dataHistory?.TwitchHistory.filter(el => el == stream.id)

                if(historyFilter.length > 0) return
                
                message = message.replace('{stream.channel}', channel)
                message = message.replace('{stream.link}', liveLink)
                message = message.replace('{stream.title}', streamTitle)
                message = message.replace('{stream.game}', streamGame)
                message = message.replace('{stream.views}', String(streamViewerCount))
                const channelDiscord: any = await client.channels.fetch(data.channelId);
                if(!channelDiscord) return
                const embed = new EmbedBuilder()
                .setAuthor({
                    name: twitchUser.data[0].display_name,
                    iconURL: twitchUser.data[0].profile_image_url,
                    url: `https://www.twitch.tv/${twitchUser.data[0].display_name}`
                })
                .setTitle(streamTitle)
                .setURL(liveLink)
                .setDescription(`${twitchUser.data[0].display_name} is now live on Twitch!`)
                .setTimestamp()
                .addFields({
                    name: '**Playing**',
                    value: streamGame
                })
                .setImage(stream.getThumbnailUrl({height: 225, width: 400 }))
                .setThumbnail(gamePhoto)
                .setFooter({text:'Twitch', iconURL:'https://img.icons8.com/color/48/null/twitch--v1.png'});
                const dataC = await alertHistorySchema.findOneAndUpdate({
                    GuildId: dataB.GuildId
                  },{
                    $push: {TwitchHistory: stream.id}
                  },{
                    upsert: true
                  })
                await channelDiscord?.send({embeds:[embed], content: message }) 
            }
        })
    }catch(err){
        console.log(err)
    }
}