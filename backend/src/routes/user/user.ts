import {Router} from 'express'
import fetch from 'node-fetch'
import { DISCORD_API_URL, DISCORD_API_VERSION, decodeJWT } from '../../utils'
import { Routes } from 'discord-api-types/v10'
const router = Router()

router.get('/', (req, res) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ msg: 'token not found' })
    const jwtResult = decodeJWT(authorization)
    if(!jwtResult.access_token || !jwtResult) return res.status(401).send({ msg: 'token is wrong' })
    
    res.status(200).send(jwtResult)
})

export default router;