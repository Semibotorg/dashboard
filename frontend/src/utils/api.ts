import axios from "axios";
import { Server } from './config'
import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
import { Stats, Guilds } from './'
export async function getUser(token: string): Promise<RESTGetAPICurrentUserResult | null>{
    const res = await axios.get(`${Server.Url}/user`,{
        headers:{
            authorization: localStorage.token
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
            authorization: localStorage.token
        }
    })
    const data: Guilds = res.data

    return data
}