import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
export const BACKEND_API_URL = 'http://localhost:5000'
export const Auth = {
    Url: "https://discord.com/api/oauth2/authorize?client_id=863406875659075614&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join",
    RedirectUrl: `${BACKEND_API_URL}/api/auth/callback`,
    
}

export const Scopes = ['identify', 'guilds', 'guilds.join']

export const DISCORD_API_VERSION = 'v10'
export const DISCORD_API_URL = 'https://discord.com/api'
export const RUST_API_URL = 'http://localhost:8000'

export interface UserJWT {
    access_token: string,
    refresh_token: string,
    user: RESTGetAPICurrentUserResult,
    token_type: string
}

export interface Stats{
    serverCount: number,
    usersCount: number
}
export interface TweetCallback {
    
        created_at: string,
        id: number,
        id_str: string,
        text: string,
        truncated: boolean,
        entities: { hashtags: any[], symbols: any[], user_mentions: [ [Object] ], urls: [] },
        source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
        in_reply_to_status_id: 1611432187458646000,
        in_reply_to_status_id_str: '1611432187458646016',
        in_reply_to_user_id: 1485689970593468400,
        in_reply_to_user_id_str: '1485689970593468416',
        in_reply_to_screen_name: 'TheRabbitHole84',
        user: {
          id: 44196397,
          id_str: '44196397',
          name: 'Elon Musk',
          screen_name: 'elonmusk',
          location: '',
          description: '',
          url: null,
          entities: { description: [Object] },
          protected: false,
          followers_count: 124778547,
          friends_count: 165,
          listed_count: 106934,
          created_at: 'Tue Jun 02 20:12:29 +0000 2009',
          favourites_count: 16742,
          utc_offset: null,
          time_zone: null,
          geo_enabled: false,
          verified: true,
          statuses_count: 21971,
          lang: null,
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
        },
        geo: null,
        coordinates: null,
        place: null,
        contributors: null,
        is_quote_status: false,
        retweet_count: 367,
        favorite_count: 7792,
        favorited: false,
        retweeted: false,
        lang: 'en'
      
}