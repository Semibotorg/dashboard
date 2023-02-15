import { Router } from "express";
import fetch from 'node-fetch'
import { DISCORD_API_URL, DISCORD_API_VERSION, decodeJWT, getUser, getUserGuilds, getBotGuilds, getMatualGuilds, getGuild } from '../../utils'
import { Routes, PermissionFlagsBits } from 'discord-api-types/v10'
import {client} from '../../bot/index'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const { authorization } = req.headers
        if (!authorization) return res.status(401).send({ msg: 'token not found' })
        const jwtResult = decodeJWT(authorization)


            const userGuilds = await getUserGuilds({access_token: jwtResult.access_token, token_type: jwtResult.token_type})
            const botGuilds = await getBotGuilds({BotToken: process.env.BOT_TOKEN!})
    
            const dataGuilds = await getMatualGuilds(userGuilds, botGuilds)
        
            res.status(200).send(dataGuilds)
        
    }catch(err){
        console.log(err)
        res.status(400).send({msg:'error occured', reason:'GUILD_MISSED'})
    }
})

router.get('/:id', async (req, res) => {
    const params: {id: string} = req.params
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ msg: 'token not found' })
    const jwtResult = decodeJWT(authorization)
    const guild = client.guilds.cache.get(params.id)
    if(!guild) return res.status(400).send({msg:'guild not found'})

    const guildResponse = await getGuild({access_token: jwtResult.access_token, token_type: jwtResult.token_type, guildId: params.id})

    const member = await guild.members.fetch({user: jwtResult.user.id})
    
    if(!member) return res.status(400).send({msg:'member not found'})
    if(!member.permissions.has(PermissionFlagsBits.Administrator)) return res.status(400).send({msg:'ADMINISTRATOR required'})

    res.status(200).send(guildResponse)
})

export default router;