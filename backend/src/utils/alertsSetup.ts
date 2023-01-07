import alertsSchema from "../models/alerts";
import { TwiiterAlert } from '../alerts/twitter/twitter'

export async function alertsSetup(){
        await alertsSchema.findOneAndUpdate({
        GuildId: '863406333894328381'
    },{
      twitter:{
        username: ['dagermohamed','elonmusk'],
        enabled: true,
        channelId:'1061163428590403595',
        message:"@everyone\n{twitter.name} just {twitter.action} here: {twitter.link}!",
        history:[]
      }

    },{
      upsert: true
    })

    setInterval(async () => {
        const dataArr = await alertsSchema.find({})
        dataArr.forEach(async (data) => {
            await TwiiterAlert(data)
        })
    }, 6000)

}