import alertsSchema from "../models/alerts";
import { TwiiterAlert } from '../alerts/twitter/twitter'
import { TwitchAlert } from "../alerts/twitch/twitch";

export async function alertsSetup(){
        await alertsSchema.findOneAndUpdate({
        GuildId: '863406333894328381'
    },{
      twitch:{
        username: ['frs9'],
        enabled: true,
        channelId:'1061193468048838716',
        message:"@everyone\n{stream.channel} is live on twitch! {stream.link}",
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
        })
    }, 6000)

}