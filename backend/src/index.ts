import { config } from "dotenv";
config();
import { createApp } from "./utils";
import alertSchema from "./models/alerts";
import {TwiiterAlert} from './alerts/twitter/twitter'
const PORT = process.env.PORT;
import cls from 'cli-color'
async function main() {
  try {
    const app = await createApp();
    // await alertSchema.findOneAndUpdate({
    //     GuildId: '863406333894328381'
      
    // },{
    //   twitter:{
    //     username: 'dagermohamed',
    //     enabled: true,
    //     channelId:'1060395655077568593',
    //     message:"@everyone\n{twitter.name} just {twitter.action} here: {twitter.link}!",
    //     history:[]
    //   }

    // },{
    //   upsert: true
    // })
    app.listen(PORT, () => console.log(`${cls.green('[EXPRESS]')} listening on [${cls.red(PORT)}] port`));
  } catch (err) {
    console.log(`${cls.red('[EXPRESS]')} Error`);
    console.log(err)
  }
}

main();
