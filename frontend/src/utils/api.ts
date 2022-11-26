import axios from "axios";
import { Server } from './config'
import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
export async function getUser(): Promise<RESTGetAPICurrentUserResult | any>{
    if(!localStorage.token) return
    const res = await axios.get(`${Server.Url}/user`,{
        headers:{
            authorization: localStorage.token
        }
    })

    const data: RESTGetAPICurrentUserResult = res.data

    return data
}