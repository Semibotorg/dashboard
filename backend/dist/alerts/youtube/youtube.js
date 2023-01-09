"use strict";
/*
   {youtube.channel}
   {youtube.link}
   {youtube.title}
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
exports.YoutubeAlert = void 0;
const alertsHistory_1 = __importDefault(require("../../models/alertsHistory"));
const bot_1 = require("../../bot");
const googleapis_1 = require("googleapis");
const rss_parser_1 = __importDefault(require("rss-parser"));
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
function YoutubeAlert(dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        const parser = new rss_parser_1.default();
        const youtube = googleapis_1.google.youtube({
            version: 'v3',
            auth: YOUTUBE_API_KEY,
        });
        const data = dataB === null || dataB === void 0 ? void 0 : dataB.youtube;
        try {
            const dataHistory = yield alertsHistory_1.default.findOne({
                GuildId: dataB === null || dataB === void 0 ? void 0 : dataB.GuildId
            });
            data === null || data === void 0 ? void 0 : data.youtubeChannelName.forEach((username) => __awaiter(this, void 0, void 0, function* () {
                if (!data || !username)
                    return;
                if (!data.enabled)
                    return;
                yield youtube.channels.list({
                    part: ['snippet', 'statistics', 'contentDetails'],
                    id: [username],
                }, (err, res) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d;
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let resItems = res === null || res === void 0 ? void 0 : res.data.items;
                    const channelName = (_a = resItems[0].snippet) === null || _a === void 0 ? void 0 : _a.title;
                    const channelImageUrl = (_d = (_c = (_b = resItems[0].snippet) === null || _b === void 0 ? void 0 : _b.thumbnails) === null || _c === void 0 ? void 0 : _c.high) === null || _d === void 0 ? void 0 : _d.url;
                    const channelId = resItems[0].id;
                    if (!channelId)
                        return;
                    const ONE_MONTH_AGO = Date.now() - 30 * 24 * 60 * 60 * 1000;
                    const NOW = Date.now();
                    try {
                        const resVideos = yield parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
                        const video = resVideos.items[0];
                        if (!video)
                            return;
                        const videoLink = video.link;
                        const videoTitle = video.title;
                        const videoId = video.id.split(':')[2];
                        const youtubeLogo = "https://img.icons8.com/color/48/null/youtube-play.png";
                        const videoThumbnail = `http://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                        if (!dataHistory)
                            return;
                        const historyFilter = dataHistory === null || dataHistory === void 0 ? void 0 : dataHistory.YoutubeHistory.filter(el => el == videoId);
                        if (historyFilter.length > 0)
                            return;
                        const channelDiscord = yield bot_1.client.channels.fetch(data.channelId);
                        if (!channelDiscord)
                            return;
                        let message = data.message;
                        message = message.replace('{youtube.channel}', channelName);
                        message = message.replace('{youtube.link}', videoLink);
                        message = message.replace('{youtube.title}', videoTitle);
                        const dataC = yield alertsHistory_1.default.findOneAndUpdate({
                            GuildId: dataB.GuildId
                        }, {
                            $push: { YoutubeHistory: videoId }
                        }, {
                            upsert: true
                        });
                        yield channelDiscord.send({ content: message });
                    }
                    catch (err) {
                        console.log(err);
                    }
                }));
            }));
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.YoutubeAlert = YoutubeAlert;
//# sourceMappingURL=youtube.js.map