import Client from "./classes/Client";
import { Collection, GatewayIntentBits, Message, Partials } from "discord.js";
import fs from 'fs'
import path from 'node:fs'
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



fs.readdirSync('./events').forEach(async file => {
    console.log(file)
     const event = await import(`./events/${file}`)

     client.on(event.name, (...args) => event.execute(client, ...args))
})
