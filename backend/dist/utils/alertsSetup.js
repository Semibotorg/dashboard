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
exports.alertsSetup = void 0;
const alerts_1 = __importDefault(require("../models/alerts"));
const twitter_1 = require("../alerts/twitter/twitter");
const twitch_1 = require("../alerts/twitch/twitch");
const youtube_1 = require("../alerts/youtube/youtube");
const reddit_1 = require("../alerts/reddit/reddit");
function alertsSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield alerts_1.default.findOneAndUpdate({
            GuildId: '863406333894328381'
        }, {
            reddit: {
                subredits: ['typescript', 'dagermohamed'],
                enabled: true,
                channelId: '1061924544585142332',
                message: "@everyone\nNew post by {reddit.author} in {reddit.subreddit} : {reddit.link}",
                history: []
            }
        }, {
            upsert: true
        });
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const dataArr = yield alerts_1.default.find({});
            dataArr.forEach((data) => __awaiter(this, void 0, void 0, function* () {
                yield (0, twitch_1.TwitchAlert)(data);
                yield (0, twitter_1.TwiiterAlert)(data);
                yield (0, youtube_1.YoutubeAlert)(data);
                yield (0, reddit_1.RedditAlert)(data);
            }));
        }), 6000);
    });
}
exports.alertsSetup = alertsSetup;
//# sourceMappingURL=alertsSetup.js.map