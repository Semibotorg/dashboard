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
function daysLeft(date: any){
    const currentDate = new Date();
    const endDate = new Date(date.endDate);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

router.get('/:id', async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ msg: "token not found" });
    const params = req.params
    const GuildId = params.id
    const jwtResult = decodeJWT(authorization);
    const guild = client.guilds.cache.get(GuildId)
    const member = await guild?.members.fetch({user: jwtResult.user.id})
    if(!member) return res.status(400).send({msg:'member not found inside the guild'})
    if(!member.permissions.has(PermissionFlagsBits.Administrator)) return res.status(400).send({msg:'ADMINISTRATOR required'})
    try{
    const data = await premiumSchema.findOne({GuildId})
    if(!data){
        return res.status(500).send({ error: `Can't find data` });
    }
    return res.status(200).send({
        active:data.lifeTime ? true : !isExpired(data),
        daysLeft: data.lifeTime ? "lifetime" : daysLeft(data),
        _id: data._id,
        GuildId: data.GuildId,
        __v: data.__v,
        endDate: data.endDate,
        lifeTime: data.lifeTime,
        startDate: data.startDate
        
    })

    }catch(err){
        if(err) return res.status(500).send({ error: 'Error checking subscription status' });
    }
    
})

export default router;
