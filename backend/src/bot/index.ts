import { Client } from 'discord.js'
import { Collection, GatewayIntentBits, Message, Partials } from "discord.js";
import fs from 'fs'
import path from "path";
import cls from "cli-color";
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ],
});


// const eventPath = path.join(__dirname, 'events')
// fs.readdirSync(eventPath).filter(file => file.endsWith('.ts' || '.js')).forEach(async file => {
//     console.log(file)
//      const event = await import(`./events/${file}`)

//      client.on(event.name, (...args: any) => event.execute(client, ...args))
// })

client.on('ready', () => {
  console.log(`${cls.green(`[DISCORD BOT]`)} Ready`);
})

client.login(process.env.BOT_TOKEN)