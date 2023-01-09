"use strict";
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
exports.RedditAlert = void 0;
const alertsHistory_1 = __importDefault(require("../../models/alertsHistory"));
const bot_1 = require("../../bot");
const discord_js_1 = require("discord.js");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
function convertSelfText(selfText) {
    return decodeURIComponent(selfText.replace(/\+/g, '%20'));
}
function RedditAlert(dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = dataB === null || dataB === void 0 ? void 0 : dataB.reddit;
        data === null || data === void 0 ? void 0 : data.subredits.forEach((subreddit) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dataHistory = yield alertsHistory_1.default.findOne({
                    GuildId: dataB === null || dataB === void 0 ? void 0 : dataB.GuildId
                });
                const options = {
                    uri: `https://www.reddit.com/r/${subreddit}/new.json`,
                    qs: {
                        limit: 1,
                        show: 'all',
                        raw_json: 1,
                    },
                    headers: {
                        'User-Agent': 'My Reddit App/1.0.0',
                    },
                    auth: {
                        user: REDDIT_CLIENT_ID,
                        pass: REDDIT_CLIENT_SECRET,
                    },
                    json: true,
                };
                const response = yield (0, request_promise_native_1.default)(options);
                if (response.error)
                    return;
                if (!response.data)
                    return;
                if (!response.data.children)
                    return;
                const dataReddit = response.data.children[0].data;
                const author = dataReddit.author;
                const comments = `https://redd.it/${dataReddit.id}`;
                const link = `https://redd.it/${dataReddit.id}`;
                const title = dataReddit.title;
                const subredditName = dataReddit.subreddit_name_prefixed;
                const selftext = dataReddit.selftext;
                if (!dataHistory)
                    return;
                const historyFilter = dataHistory === null || dataHistory === void 0 ? void 0 : dataHistory.RedditHistory.filter(el => el == dataReddit.id);
                if (historyFilter.length > 0)
                    return;
                let message = data.message;
                message = message.replace('{reddit.author}', author);
                message = message.replace('{reddit.comments}', comments);
                message = message.replace('{reddit.link}', link);
                message = message.replace('{reddit.title}', title);
                message = message.replace('{reddit.subreddit}', subredditName);
                const channelDiscord = yield bot_1.client.channels.fetch(data.channelId);
                if (!channelDiscord)
                    return;
                let embed = new discord_js_1.EmbedBuilder()
                    .setAuthor({
                    name: author,
                    url: `https://www.reddit.com/user/${author}`
                })
                    .setTitle(title)
                    .setURL(link)
                    .setDescription(`${author} posted in ${subredditName}`)
                    .setFooter({ text: 'Reddit', iconURL: 'https://i.imgur.com/ref0iBx_d.webp' })
                    .setTimestamp();
                const dataC = yield alertsHistory_1.default.findOneAndUpdate({
                    GuildId: dataB === null || dataB === void 0 ? void 0 : dataB.GuildId
                }, {
                    $push: { RedditHistory: dataReddit.id }
                }, {
                    upsert: true
                });
                yield channelDiscord.send({ content: message, embeds: [embed] });
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
}
exports.RedditAlert = RedditAlert;
//# sourceMappingURL=reddit.js.map