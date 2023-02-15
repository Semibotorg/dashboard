import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
export const BACKEND_API_URL = 'http://localhost:5000'
export const Auth = {
    Url: "https://discord.com/api/oauth2/authorize?client_id=863406875659075614&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join",
    RedirectUrl: `${BACKEND_API_URL}/api/auth/callback`,
    
}

export const Scopes = ['identify', 'guilds', 'guilds.join']

export const DISCORD_API_VERSION = 'v10'
export const DISCORD_API_URL = 'https://discord.com/api'

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
export function isExpired(date: any){
    const currentDate = new Date()
    return currentDate >= date.endDate
}