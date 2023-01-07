"use strict";
/*
    {stream.channel}
    {stream.link}
    {stream.title}
    {stream.game}
    {stream.views}
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchAlert = void 0;
const alertsHistory_1 = __importDefault(require("../../models/alertsHistory"));
const bot_1 = require("../../bot");
const node_twitch_1 = __importDefault(require("node-twitch"));
const discord_js_1 = require("discord.js");
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
function TwitchAlert(dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        const twitchClient = new node_twitch_1.default({
            client_id: TWITCH_CLIENT_ID,
            client_secret: TWITCH_CLIENT_SECRET
        });
        const data = dataB === null || dataB === void 0 ? void 0 : dataB.twitch;
        try {
            data === null || data === void 0 ? void 0 : data.username.forEach((username) => __awaiter(this, void 0, void 0, function* () {
                if (!data || !username)
                    return;
                if (!data.enabled)
                    return;
                const twitchUser = yield twitchClient.getUsers(username);
                if (!twitchUser)
                    return;
                const userId = twitchUser.data[0].id;
                const twitchStream = yield twitchClient.getStreams({ channel: userId });
                const stream = twitchStream.data[0];
                const dataHistory = yield alertsHistory_1.default.findOne({
                    GuildId: dataB.GuildId
                });
                if (!stream)
                    return;
                if (stream) {
                    let message = data.message;
                    const channel = stream.user_name;
                    const liveLink = `https://www.twitch.tv/${twitchUser.data[0].display_name}`;
                    const streamTitle = stream.title;
                    const streamGame = stream.game_name;
                    const streamViewerCount = stream.viewer_count;
                    const twitchGame = (yield twitchClient.getGames(streamGame)).data[0];
                    let gamePhoto = twitchGame.box_art_url;
                    gamePhoto = gamePhoto.replace('{width}', '60');
                    gamePhoto = gamePhoto.replace('{height}', '80');
                    if (!dataHistory)
                        return;
                    const historyFilter = dataHistory === null || dataHistory === void 0 ? void 0 : dataHistory.TwitchHistory.filter(el => el == stream.id);
                    if (historyFilter.length > 0)
                        return;
                    message = message.replace('{stream.channel}', channel);
                    message = message.replace('{stream.link}', liveLink);
                    message = message.replace('{stream.title}', streamTitle);
                    message = message.replace('{stream.game}', streamGame);
                    message = message.replace('{stream.views}', String(streamViewerCount));
                    const channelDiscord = yield bot_1.client.channels.fetch(data.channelId);
                    const embed = new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: twitchUser.data[0].display_name,
                        iconURL: twitchUser.data[0].profile_image_url,
                        url: `https://www.twitch.tv/${twitchUser.data[0].display_name}`
                    })
                        .setTitle(streamTitle)
                        .setURL(liveLink)
                        .setDescription(`${twitchUser.data[0].display_name} is now live on Twitch!`)
                        .addFields({
                        name: '**Playing**',
                        value: streamGame
                    }, {
                        name: '**Views**',
                        value: String(streamViewerCount)
                    })
                        .setImage(stream.getThumbnailUrl({ height: 225, width: 400 }))
                        .setThumbnail(gamePhoto)
                        .setFooter({ text: 'Twitch', iconURL: 'https://img.icons8.com/color/48/null/twitch--v1.png' });
                    const dataC = yield alertsHistory_1.default.findOneAndUpdate({
                        GuildId: dataB.GuildId
                    }, {
                        $push: { TwitchHistory: stream.id }
                    }, {
                        upsert: true
                    });
                    yield (channelDiscord === null || channelDiscord === void 0 ? void 0 : channelDiscord.send({ embeds: [embed], content: message }));
                }
            }));
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.TwitchAlert = TwitchAlert;
//# sourceMappingURL=twitch.js.map