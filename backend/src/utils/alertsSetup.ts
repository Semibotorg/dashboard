import alertsSchema from "../models/alerts";
import { TwiiterAlert } from '../alerts/twitter/twitter'
import { TwitchAlert } from "../alerts/twitch/twitch";
import { YoutubeAlert } from "../alerts/youtube/youtube";

export async function alertsSetup(){
        await alertsSchema.findOneAndUpdate({
        GuildId: '863406333894328381'
    },{
      youtube:{
        youtubeChannelName : ['UCagiPPCeHCYOa5XJNZWVcYA'],
        enabled: true,
        channelId:'1061219088178872473',
        message:"@everyone\n{youtube.channel} uploaded a new video [{youtube.title}] - {youtube.link}",
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
        })
    }, 6000)

}