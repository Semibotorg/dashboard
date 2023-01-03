import { Router } from "express";
import axios from "axios";
import { Auth, Scopes, DISCORD_API_URL, DISCORD_API_VERSION, getUser } from '../../utils'
import jwt from 'jsonwebtoken'
import fetch from "node-fetch";
import {RESTPostOAuth2AccessTokenResult, Routes} from 'discord-api-types/v10'
const router = Router()

router.get('/login', async (req, res) => {
    res.redirect(Auth.Url)
})
router.get('/callback', async (req, res) => {
    const code: string = req.query.code as any;
    const error = req.query.error;
    if (error) return res.status(200).send(`<script>window.close();</script>`);
    if (!code) return res.status(400).send({ msg: 'wrong code' });

      try{
      const data = new URLSearchParams()
      data.append('client_id', process.env.CLIENT_ID!);
      data.append('client_secret', process.env.CLIENT_SECRET!);
      data.append('grant_type', 'authorization_code');
      data.append('redirect_uri', Auth.RedirectUrl);
      data.append('scope', Scopes.join(' '));
      data.append('code', code);
      const tokenWait = await fetch(`${DISCORD_API_URL}/${DISCORD_API_VERSION}${Routes.oauth2TokenExchange()}`,{
        method:'POST',
        body:data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      const tokenResponse: RESTPostOAuth2AccessTokenResult = await tokenWait.json()
      const userResponse = await getUser({access_token: tokenResponse.access_token, token_type: tokenResponse.token_type})
        
        const token = jwt.sign({
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            user: userResponse,
            token_type: tokenResponse.token_type
        },process.env.JWT_PASSWORD as string)
    
        res
        .status(200)
        .send(
          `<script>window.opener.postMessage("${token} login", "*"); window.close(); </script>`
        )
  }catch(err){
    console.log(err)
  }
})

export default router;