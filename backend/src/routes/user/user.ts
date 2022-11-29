import {Router} from 'express'
import fetch from 'node-fetch'
import { DISCORD_API_URL, DISCORD_API_VERSION, decodeJWT, getUser, getUserGuilds, getBotGuilds, getMatualGuilds } from '../../utils'
import { Routes } from 'discord-api-types/v10'
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

router.get('/guilds', async (req, res) => {
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
        res.status(400).send({msg:'error occured'})
    }
})

export default router;