import { Router } from "express";
import Twit from "twit";
import alertsSchema from "../../models/alerts";
import { client } from "../../bot";
import { PermissionFlagsBits } from "discord.js";
import { decodeJWT } from "../../utils";

const router = Router();

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

router.get("/add", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ msg: "token not found" });
    const userJWT = await decodeJWT(authorization);
  
    const twitter_username: string | undefined = req.body.twitter_username;
    const guild_id: string | undefined = req.body.guild_id;
    const discord_channel_id: string | undefined = req.body.discord_channel_id;
    const message: string | undefined = req.body.message;
  
    if (!twitter_username || !guild_id || !message || !discord_channel_id)
      return res.status(400).send({ msg: "bad request" });
    const guild = await (
      await client.guilds.fetch()
    ).find((g) => g.id == guild_id);
    if (!guild) return res.status(404).send({ msg: "guild not found" });
    
    if (!(await (await guild.fetch()).channels.fetch(discord_channel_id)))
      return res.status(404).send({ msg: "discord channel not found" });
  
    const user = await (
      await guild.fetch()
    ).members.fetch({ user: { id: userJWT.user.id } as any });
  
    if (!user.permissions.has(PermissionFlagsBits.Administrator))
      return res.status(406).send({ msg: "Administrator permission required" });
  const res_twitter: any = await T.get("/users/lookup", {
    screen_name: twitter_username,
  });

  const twitter_user = res_twitter?.data[0]
  if(!twitter_user?.screen_name) return res.status(404).send({msg:"twitter user is not valid"})
  
});
  /*
  [
  {
    id: 44196397,
    id_str: '44196397',
    name: 'Elon Musk',
    screen_name: 'elonmusk',
    location: '',
    description: '',
    url: null,
    entities: { description: [Object] },
    protected: false,
    followers_count: 128933966,
    friends_count: 176,
    listed_count: 114942,
    created_at: 'Tue Jun 02 20:12:29 +0000 2009',
    favourites_count: 18204,
    utc_offset: null,
    time_zone: null,
    geo_enabled: false,
    verified: true,
    statuses_count: 22838,
    lang: null,
    status: {
      created_at: 'Wed Feb 15 09:50:14 +0000 2023',
      id: 1625794605370466300,
      id_str: '1625794605370466304',
      text: '@alx This tiny candle of consciousness we have on Earth might be all there is',
      truncated: false,
      entities: [Object],
      source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
      in_reply_to_status_id: 1625742876381421600,
      in_reply_to_status_id_str: '1625742876381421569',
      in_reply_to_user_id: 534023,
      in_reply_to_user_id_str: '534023',
      in_reply_to_screen_name: 'alx',
      geo: null,
      coordinates: null,
      place: null,
      contributors: null,
      is_quote_status: false,
      retweet_count: 1568,
      favorite_count: 19910,
      favorited: false,
      retweeted: false,
      lang: 'en'
    },
    contributors_enabled: false,
    is_translator: false,
    is_translation_enabled: false,
    profile_background_color: 'C0DEED',
    profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_tile: false,
    profile_image_url: 'http://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/44196397/1576183471',
    profile_link_color: '0084B4',
    profile_sidebar_border_color: 'C0DEED',
    profile_sidebar_fill_color: 'DDEEF6',
    profile_text_color: '333333',
    profile_use_background_image: true,
    has_extended_profile: true,
    default_profile: false,
    default_profile_image: false,
    following: true,
    follow_request_sent: false,
    notifications: false,
    translator_type: 'none',
    withheld_in_countries: []
  }
]
   */
export default router;
