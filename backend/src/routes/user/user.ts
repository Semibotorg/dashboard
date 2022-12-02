import {Router} from 'express'
import fetch from 'node-fetch'
import { DISCORD_API_URL, DISCORD_API_VERSION, decodeJWT, getUser, getUserGuilds, getBotGuilds, getMatualGuilds, RUST_API_URL } from '../../utils'
import { Routes } from 'discord-api-types/v10'
import {client} from '../../bot/index'

import guildRouter from './guilds'
const router = Router()

router.get('/', async (req, res) => {
try{
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ msg: 'token not found' })
    const jwtResult = decodeJWT(authorization)
    
    const user = await getUser({access_token: jwtResult.access_token, token_type: jwtResult.token_type})
    if(user){
        return res.status(200).send(user)
    }else{
        return res.status(400).send({msg:'Error while fetching user'})
    }
}catch(err){
    console.log(err)
}
    
})

router.use('/guilds', guildRouter)

export default router;