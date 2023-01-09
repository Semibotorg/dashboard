import alertsSchema from "../models/alerts";
import { TwiiterAlert } from '../alerts/twitter/twitter'
import { TwitchAlert } from "../alerts/twitch/twitch";
import { YoutubeAlert } from "../alerts/youtube/youtube";
import { RedditAlert } from "../alerts/reddit/reddit";

export async function alertsSetup(){
        await alertsSchema.findOneAndUpdate({
        GuildId: '863406333894328381'
    },{
      reddit:{
        subredits: ['typescript','dagermohamed'],
        enabled: true,
        channelId:'1061924544585142332',
        message:"@everyone\nNew post by {reddit.author} in {reddit.subreddit} : {reddit.link}",
        history:[]
      }

    },{
      upsert: true
    })

    setInterval(async () => {
        const dataArr = await alertsSchema.find({})
        dataArr.forEach(async (data) => {
            await TwitchAlert(data)
            await TwiiterAlert(data)
            await YoutubeAlert(data)
            await RedditAlert(data)
        })
    }, 6000)

}