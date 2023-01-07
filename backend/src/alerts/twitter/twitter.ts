/*
message aliases:
{twitter.tweet}
{twitter.profileImageURL}
{twitter.username}
{twitter.name}
{twitter.link}
{twitter.action}
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { Types } from "mongoose";
import { Idoc } from "../../models/alerts";
import alertHistorySchema from "../../models/alertsHistory";
import { client } from "../../bot";
import Twit from "twit";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;
let previousTweetTimestamp = "";
const T = new Twit({
  consumer_key: TWITTER_API_KEY!,
  consumer_secret: TWITTER_API_KEY_SECRET!,
  access_token: TWITTER_ACCESS_TOKEN!,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET!,
});
export async function TwiiterAlert(dataB: Idoc | null) {
  const data = dataB?.twitter;

  try {
    data?.username.forEach(async (username) => {
      if (!data || !username) return;
      if (!data.enabled) return;

      const response: any = await T.get("statuses/user_timeline", {
        screen_name: username,
        count: 1,
      });

      if (response.resp.statusCode != 200) return;
      const tweet = response.data[0];
      if (!tweet) return;
      let tweetText: string = tweet.text;
      const profileImageURL: string = tweet.user.profile_image_url_https;
      const followersPorfile: string = tweet.user.followers_count;
      const profileName: string = tweet.user.name;
      const profileUsername: string = tweet.user.screen_name;
      const tweetId: string = tweet.id_str;
      const tweetLink: string = `https://twitter.com/${profileUsername}/status/${tweetId}`;
      let tweetMediaType: "video" | "photo" | "" = "";
      if (tweet.entities.media) {
        if (tweet.entities.media.length > 0) {
          tweetMediaType = tweet.entities.media[0].type;
        }
      }
      let videoDuration: string = "";
      let tweetPhotoLink: string = "";
      if (tweetMediaType) {
        if (tweetMediaType == "photo") {
          tweetPhotoLink = tweet.entities.media[0].media_url_https;
        } else if (tweetMediaType == "video") {
          tweetPhotoLink = tweet.entities.media[0].media_url_https;
          videoDuration = `${Math.round(
            tweet.entities.media[0].video_info.duration_millis / 1000 / 3600
          )}:${Math.round(
            tweet.entities.media[0].video_info.duration_millis / 1000
          )}`;
        }
      }
      let action: string = "tweeted";
      if (!tweetText) return;
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

      if (await isOld(dataTwitter.tweetText as any, dataB)) return;
      await sendNotification(dataTwitter, dataB);
    });
  } catch (err) {
    console.log(err);
  }

}
async function isOld(tweet: string, dataB: Idoc) {
  // Check if the tweet is in the list of old tweets
  const data = dataB.twitter
  const dataHistory = await alertHistorySchema.findOne({
    GuildId: dataB.GuildId
  })
  if (!dataHistory || !dataHistory.TwitterHistory) return false;
  const dataFilter = dataHistory.TwitterHistory.filter((el: any) => el == tweet);

  if (dataFilter.length > 0) return true;
  else false;
  // Return true if it is, false otherwise
}
async function sendNotification(tweet: {
  tweetText: string;
  profileImageURL: string;
  profileName: string;
  tweetLink: string;
  action: string;
  profileUsername: string;
  tweetPhotoLink: string;
  videoDuration: string;
  tweetMediaType: string;
}, dataB: Idoc) {
  // Send a notification containing the list of new tweets
  const data = dataB.twitter
  if (!tweet || tweet == null) return;
  if (!data?.channelId) return;
  if (data.channelId) {
    const channel: any = await client.channels.fetch(data.channelId);
    if (channel) {
      let message = data.message;
      if (!message) return
      message = message.replace("{twitter.tweet}", tweet.tweetText);
      message = message.replace(
        "{twitter.profileImageURL}",
        tweet.profileImageURL
      );
      message = message.replace("{twitter.username}", tweet.profileUsername);
      message = message.replace("{twitter.name}", tweet.profileName);
      message = message.replace("{twitter.link}", tweet.tweetLink);
      message = message.replace("{twitter.action}", tweet.action);
      let titleEmbed = "";
      tweet.tweetMediaType == "photo" || tweet.tweetMediaType == "video"
        ? (titleEmbed = `${tweet.profileName} ${tweet.action} a ${tweet.tweetMediaType}`)
        : (titleEmbed = `${tweet.profileName} ${tweet.action} a status`);

      let embed = new EmbedBuilder()
        .setAuthor({
          name: `${tweet.profileName} - @${tweet.profileUsername}`,
          iconURL: tweet.profileImageURL,
          url: `https://twitter.com/${tweet.profileUsername}`,
        })
        .setTitle(titleEmbed)
        .setURL(tweet.tweetLink)
        .setThumbnail(tweet.profileImageURL)
        .setDescription(tweet.tweetText)
        .setColor('00aced' as any)
        .setFooter({
          text: "Twitter",
          iconURL: "https://img.icons8.com/color/48/null/twitter--v1.png",
        });
      if (
        tweet.tweetMediaType == "photo" &&
        tweet.tweetPhotoLink.length != 0
      ) {
        embed = new EmbedBuilder()
        .setAuthor({
          name: `${tweet.profileName} - @${tweet.profileUsername}`,
          iconURL: tweet.profileImageURL,
          url: `https://twitter.com/${tweet.profileUsername}`,
        })
          .setTitle(titleEmbed)
          .setThumbnail(tweet.profileImageURL)
          .setURL(tweet.tweetLink)
          .setColor('00aced' as any)
          .setDescription(tweet.tweetText)
          .setImage(tweet.tweetPhotoLink)
          .setFooter({
            text: "Twitter",
            iconURL: "https://img.icons8.com/color/48/null/twitter--v1.png",
          });
      } else if (
        tweet.tweetMediaType == "video" &&
        tweet.tweetPhotoLink.length != 0 &&
        tweet.videoDuration.length != 0
      ) {
        embed = new EmbedBuilder()
        .setAuthor({
          name: `${tweet.profileName} - @${tweet.profileUsername}`,
          iconURL: tweet.profileImageURL,
          url: `https://twitter.com/${tweet.profileUsername}`,
        })
          .setTitle(titleEmbed)
          .setURL(tweet.tweetLink)
          .setThumbnail(tweet.profileImageURL)
          .setColor('00aced' as any)
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
      const dataC = await alertHistorySchema.findOneAndUpdate({
        GuildId: dataB.GuildId
      },{
        $push: {TwitterHistory: tweet.tweetText}
      },{
        upsert: true
      })

      await channel.send({ content: message, embeds: [embed] });
    }
  }
}