import { Types } from "mongoose";
import { Idoc } from "../../models/alerts";
import alertHistorySchema from "../../models/alertsHistory";
import { client } from "../../bot";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import rp from 'request-promise-native';

const REDDIT_CLIENT_ID=process.env.REDDIT_CLIENT_ID
const REDDIT_CLIENT_SECRET=process.env.REDDIT_CLIENT_SECRET
function convertSelfText(selfText: string) {
    return decodeURIComponent(selfText.replace(/\+/g, '%20'));
  }
export async function RedditAlert(dataB: Idoc | null){
    
    const data = dataB?.reddit
    
        data?.subredits.forEach(async (subreddit) => {
            try{
                if(!data || !subreddit) return 
                if(!data.enabled) return 
                const dataHistory = await alertHistorySchema.findOne({
                    GuildId: dataB?.GuildId
                  })
            const options = {
                uri: `https://www.reddit.com/r/${subreddit}/new.json`,
                qs: {
                  limit: 1,
                  show: 'all',
                  raw_json: 1,
                },
                headers: {
                  'User-Agent': 'My Reddit App/1.0.0',
                },
                auth: {
                  user: REDDIT_CLIENT_ID,
                  pass: REDDIT_CLIENT_SECRET,
                },
                json: true,
              };
              const response = await rp(options)
 
              if(response.error) return
              if(!response.data) return
              if(!response.data.children) return
              
              const dataReddit = response.data.children[0].data
              const author = dataReddit.author
              const comments = `https://redd.it/${dataReddit.id}`
              const link = `https://redd.it/${dataReddit.id}`
              const title = dataReddit.title
              const subredditName = dataReddit.subreddit_name_prefixed
              const selftext = dataReddit.selftext
              if(!dataHistory) return
              const historyFilter = dataHistory?.RedditHistory.filter(el => el == dataReddit.id)

              if(historyFilter.length > 0) return
              let message = data.message
              message = message.replace('{reddit.author}', author)
              message = message.replace('{reddit.comments}', comments)
              message = message.replace('{reddit.link}', link)
              message = message.replace('{reddit.title}', title)
              message = message.replace('{reddit.subreddit}', subredditName)
              const channelDiscord: any = await client.channels.fetch(data.channelId);
              if(!channelDiscord) return
              let embed = new EmbedBuilder()
              .setAuthor({
                name:author,
                url:`https://www.reddit.com/user/${author}`
              })
              .setTitle(title)
              .setColor('ff4500' as any)
              .setURL(link)
              .setDescription(`${author} posted in ${subredditName}`)
              .setFooter({text:'Reddit',iconURL:'https://i.imgur.com/ref0iBx_d.webp'})
              .setTimestamp()
              const dataC = await alertHistorySchema.findOneAndUpdate({
                GuildId: dataB?.GuildId
              },{
                $push: {RedditHistory: dataReddit.id}
              },{
                upsert: true
              })
              await channelDiscord.send({content: message, embeds:[embed]})
            }catch(err){
                console.log(err)
            }
        })

}