import axios from "axios";
import { Server } from './config'
import { RESTGetAPICurrentUserResult, APIGuild } from 'discord-api-types/v10'
import { Stats, Guilds, PremiumStatus } from './'
export async function getUser(token: string): Promise<RESTGetAPICurrentUserResult | null>{
    const res = await axios.get(`${Server.Url}/user`,{
        headers:{
            authorization: token
        }
    })

    const data: RESTGetAPICurrentUserResult = res.data

    return data
}


export async function getStats(): Promise<Stats> {
    const res = await axios.get(`${Server.Url}/stats`)
    const data: Stats = res.data.stats

    return data
}

export async function getGuilds(token: string): Promise<Guilds> {
    const res = await axios.get(`${Server.Url}/user/guilds`,{
        headers:{
            authorization: token
        }
    })
    const data: Guilds = res.data
    return data
}

export async function getGuild(token: string, guildId: string): Promise<APIGuild> {
    const res = await axios.get(`${Server.Url}/user/guilds/${guildId}`,{
        headers:{
            authorization: token
        }
    })
    const data: APIGuild = res.data

    return data
}


export async function getPremiumStatus(token: string, guildId: string): Promise<PremiumStatus> {
    const res = await axios.get(`${Server.Url}/premium/status/${guildId}`,{
        headers:{
            authorization: token
        }
    })
    const data: PremiumStatus = res.data

    return data
}