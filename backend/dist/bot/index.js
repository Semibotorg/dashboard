"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const cli_color_1 = __importDefault(require("cli-color"));
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_2.GatewayIntentBits.Guilds,
        discord_js_2.GatewayIntentBits.GuildBans,
        discord_js_2.GatewayIntentBits.GuildInvites,
        discord_js_2.GatewayIntentBits.GuildMembers,
        discord_js_2.GatewayIntentBits.GuildMessages,
        discord_js_2.GatewayIntentBits.MessageContent,
        discord_js_2.GatewayIntentBits.GuildMessages
    ],
});
// const eventPath = path.join(__dirname, 'events')
// fs.readdirSync(eventPath).filter(file => file.endsWith('.ts' || '.js')).forEach(async file => {
//     console.log(file)
//      const event = await import(`./events/${file}`)
//      client.on(event.name, (...args: any) => event.execute(client, ...args))
// })
exports.client.on('ready', () => {
    console.log(`${cli_color_1.default.green(`[DISCORD BOT]`)} Ready`);
});
exports.client.login(process.env.BOT_TOKEN);
//# sourceMappingURL=index.js.map