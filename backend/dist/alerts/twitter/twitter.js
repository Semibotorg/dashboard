"use strict";
/*
message aliases:
{twitter.tweet}
{twitter.profileImageURL}
{twitter.username}
{twitter.name}
{twitter.link}
{twitter.action}
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
exports.TwiiterAlert = void 0;
const alertsHistory_1 = __importDefault(require("../../models/alertsHistory"));
const bot_1 = require("../../bot");
const twit_1 = __importDefault(require("twit"));
const discord_js_1 = require("discord.js");
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;
let previousTweetTimestamp = "";
const T = new twit_1.default({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_KEY_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});
function TwiiterAlert(dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = dataB === null || dataB === void 0 ? void 0 : dataB.twitter;
        try {
            data === null || data === void 0 ? void 0 : data.username.forEach((username) => __awaiter(this, void 0, void 0, function* () {
                if (!data || !username)
                    return;
                if (!data.enabled)
                    return;
                const response = yield T.get("statuses/user_timeline", {
                    screen_name: username,
                    count: 1,
                });
                if (response.resp.statusCode != 200)
                    return;
                const tweet = response.data[0];
                if (!tweet)
                    return;
                let tweetText = tweet.text;
                const profileImageURL = tweet.user.profile_image_url_https;
                const followersPorfile = tweet.user.followers_count;
                const profileName = tweet.user.name;
                const profileUsername = tweet.user.screen_name;
                const tweetId = tweet.id_str;
                const tweetLink = `https://twitter.com/${profileUsername}/status/${tweetId}`;
                let tweetMediaType = "";
                if (tweet.entities.media) {
                    if (tweet.entities.media.length > 0) {
                        tweetMediaType = tweet.entities.media[0].type;
                    }
                }
                let videoDuration = "";
                let tweetPhotoLink = "";
                if (tweetMediaType) {
                    if (tweetMediaType == "photo") {
                        tweetPhotoLink = tweet.entities.media[0].media_url_https;
                    }
                    else if (tweetMediaType == "video") {
                        tweetPhotoLink = tweet.entities.media[0].media_url_https;
                        videoDuration = `${Math.round(tweet.entities.media[0].video_info.duration_millis / 1000 / 3600)}:${Math.round(tweet.entities.media[0].video_info.duration_millis / 1000)}`;
                    }
                }
                let action = "tweeted";
                if (!tweetText)
                    return;
                if (tweet.retweeted_status) {
                    tweetText = tweet.retweeted_status.text;
                    action = "retweeted";
                }
                const dataTwitter = {
                    tweetText: tweetText,
                    profileImageURL: profileImageURL,
                    profileName: profileName,
                    profileUsername: profileUsername,
                    tweetLink: tweetLink,
                    action: action,
                    tweetPhotoLink: tweetPhotoLink,
                    videoDuration: videoDuration,
                    tweetMediaType: tweetMediaType,
                };
                if (yield isOld(dataTwitter.tweetText, dataB))
                    return;
                yield sendNotification(dataTwitter, dataB);
            }));
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.TwiiterAlert = TwiiterAlert;
function isOld(tweet, dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the tweet is in the list of old tweets
        const data = dataB.twitter;
        const dataHistory = yield alertsHistory_1.default.findOne({
            GuildId: dataB.GuildId
        });
        if (!dataHistory || !dataHistory.TwitterHistory)
            return false;
        const dataFilter = dataHistory.TwitterHistory.filter((el) => el == tweet);
        if (dataFilter.length > 0)
            return true;
        else
            false;
        // Return true if it is, false otherwise
    });
}
function sendNotification(tweet, dataB) {
    return __awaiter(this, void 0, void 0, function* () {
        // Send a notification containing the list of new tweets
        const data = dataB.twitter;
        if (!tweet || tweet == null)
            return;
        if (!(data === null || data === void 0 ? void 0 : data.channelId))
            return;
        if (data.channelId) {
            const channel = yield bot_1.client.channels.fetch(data.channelId);
            if (channel) {
                let message = data.message;
                if (!message)
                    return console.log("!message");
                message = message.replace("{twitter.tweet}", tweet.tweetText);
                message = message.replace("{twitter.profileImageURL}", tweet.profileImageURL);
                message = message.replace("{twitter.username}", tweet.profileUsername);
                message = message.replace("{twitter.name}", tweet.profileName);
                message = message.replace("{twitter.link}", tweet.tweetLink);
                message = message.replace("{twitter.action}", tweet.action);
                console.log("every thing is good now");
                let titleEmbed = "";
                tweet.tweetMediaType == "photo" || tweet.tweetMediaType == "video"
                    ? (titleEmbed = `${tweet.profileName} ${tweet.action} a ${tweet.tweetMediaType}`)
                    : (titleEmbed = `${tweet.profileName} ${tweet.action} a post`);
                let embed = new discord_js_1.EmbedBuilder()
                    .setAuthor({
                    name: `${tweet.profileName} - @${tweet.profileUsername}`,
                    iconURL: tweet.profileImageURL,
                    url: `https://twitter.com/${tweet.profileUsername}`,
                })
                    .setTitle(titleEmbed)
                    .setURL(tweet.tweetLink)
                    .setThumbnail(tweet.profileImageURL)
                    .setDescription(tweet.tweetText)
                    .setColor('00aced')
                    .setFooter({
                    text: "Twitter",
                    iconURL: "https://img.icons8.com/color/48/null/twitter--v1.png",
                });
                if (tweet.tweetMediaType == "photo" &&
                    tweet.tweetPhotoLink.length != 0) {
                    embed = new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: `${tweet.profileName} - @${tweet.profileUsername}`,
                        iconURL: tweet.profileImageURL,
                        url: `https://twitter.com/${tweet.profileUsername}`,
                    })
                        .setTitle(titleEmbed)
                        .setThumbnail(tweet.profileImageURL)
                        .setURL(tweet.tweetLink)
                        .setColor('00aced')
                        .setDescription(tweet.tweetText)
                        .setImage(tweet.tweetPhotoLink)
                        .setFooter({
                        text: "Twitter",
                        iconURL: "https://img.icons8.com/color/48/null/twitter--v1.png",
                    });
                }
                else if (tweet.tweetMediaType == "video" &&
                    tweet.tweetPhotoLink.length != 0 &&
                    tweet.videoDuration.length != 0) {
                    embed = new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: `${tweet.profileName} - @${tweet.profileUsername}`,
                        iconURL: tweet.profileImageURL,
                        url: `https://twitter.com/${tweet.profileUsername}`,
                    })
                        .setTitle(titleEmbed)
                        .setURL(tweet.tweetLink)
                        .setThumbnail(tweet.profileImageURL)
                        .setColor('00aced')
                        .setDescription(tweet.tweetText)
                        .addFields({
                        name: "**Video duration**",
                        value: `**${tweet.videoDuration}**`,
                    })
                        .setImage(tweet.tweetPhotoLink)
                        .setFooter({
                        text: "Twitter",
                        iconURL: "https://img.icons8.com/color/48/null/twitter--v1.png",
                    });
                }
                const dataC = yield alertsHistory_1.default.findOneAndUpdate({
                    GuildId: dataB.GuildId
                }, {
                    $push: { TwitterHistory: tweet.tweetText }
                }, {
                    upsert: true
                });
                yield channel.send({ content: message, embeds: [embed] });
                console.log("done");
            }
        }
    });
}
//# sourceMappingURL=twitter.js.map