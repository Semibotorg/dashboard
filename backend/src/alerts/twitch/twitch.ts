/*
    {stream.channel}
    {stream.link}
    {stream.title}
    {stream.game}
    {stream.views}
 */

import { Types } from "mongoose";
import { Idoc } from "../../models/alerts";
import alertHistorySchema from "../../models/alertsHistory";
import { client } from "../../bot";
import Twitch from "node-twitch";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
export async function TwitchAlert(dataB: Idoc | null){
    const twitchClient = new Twitch({
        client_id: TWITCH_CLIENT_ID!,
        client_secret: TWITCH_CLIENT_SECRET!
    })
    const data = dataB?.twitch
    try{
        data?.username.forEach(async(username) => {
            if(!data || !username) return
            if(!data.enabled) return
            const twitchUser = await twitchClient.getUsers(username)
            const userId = twitchUser.data[0].id

            const twitchStream = await twitchClient.getStreams({channel: userId})
            const stream = twitchStream.data[0]
            
            if(!stream) return
            if(stream){
                const channel = stream.user_name
                const liveLink = `https://www.twitch.tv/${stream.user_name}`
                const streamTitle = stream.title
                const streamGame = stream.game_name
                const streamViewerCount = stream.viewer_count
                
            }
        })
    }catch(err){
        console.log(err)
    }
}