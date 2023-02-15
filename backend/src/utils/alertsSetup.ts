import alertsSchema from "../models/alerts";
import { TwiiterAlert } from '../alerts/twitter/twitter'
import { TwitchAlert } from "../alerts/twitch/twitch";
import { YoutubeAlert } from "../alerts/youtube/youtube";
import { RedditAlert } from "../alerts/reddit/reddit";
import premiumSchema from '../models/premium'
import { isExpired } from "./constants";

export async function alertsSetup(){
    //     await alertsSchema.findOneAndUpdate({
    //     GuildId: '863406333894328381'
    // },{
    //   reddit:{
    //     subredits: ['typescript','dagermohamed'],
    //     enabled: true,
    //     channelId:'1061924544585142332',
    //     message:"@everyone\nNew post by {reddit.author} in {reddit.subreddit} : {reddit.link}",
    //     history:[]
    //   }

    // },{
    //   upsert: true
    // })

    setInterval(async () => {
      try{
        const dataArr = await alertsSchema.find({})
        dataArr.forEach(async (data) => {
          const dataPremium = await premiumSchema.findOne({GuildId: data.GuildId})
          if(!dataPremium) return
          if(isExpired(dataPremium) == false || dataPremium.lifeTime == true){
            await TwitchAlert(data)
            await TwiiterAlert(data)
            await YoutubeAlert(data)
            await RedditAlert(data)
          } else return
        })
      }catch(err){
        console.log(err)
      }
    }, 6000)
}