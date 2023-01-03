import { Router } from "express";
import fetch from "node-fetch";
import {
  DISCORD_API_URL,
  DISCORD_API_VERSION,
  decodeJWT,
  getUser,
  getUserGuilds,
  getBotGuilds,
  getMatualGuilds,
  RUST_API_URL,
  getGuild,
  BACKEND_API_URL,
} from "../../utils";
import { Routes, PermissionFlagsBits } from "discord-api-types/v10";
import { client } from "../../bot/index";
import paypal from "paypal-rest-sdk";
import premiumSchema from '../../models/premium'
import premium from "../../models/premium";
const router = Router();

function isExpired(date: any){
    const currentDate = new Date()
    return currentDate >= date.endDate
}

router.get('/', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ msg: "token not found" });
    const jwtResult = decodeJWT(authorization);

    const GuildId: string = req.body.guild_id
    try{
    const data = await premiumSchema.findOne({GuildId})
    if(!data){
        return res.status(500).send({ error: `Can't find data` });
    }
    if(data.lifeTime){
        return res.status(200).send({
            active: true,
            ...data
        })
    }else{
        return res.status(200).send({
            active: !isExpired(data),
            ...data
        })
    }

    }catch(err){
        if(err) return res.status(500).send({ error: 'Error checking subscription status' });
    }
    
})

export default router;
