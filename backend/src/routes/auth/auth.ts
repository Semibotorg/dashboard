import { Router } from "express";
import axios from "axios";
import { Auth, Scopes, DISCORD_API } from '../../utils'
import jwt from 'jsonwebtoken'
import passport from "passport";
const router = Router()

router.get('/login', async (req, res) => {
    res.redirect(Auth.Url)
})
router.get('/callback', async (req, res) => {
    const code: string = req.query.code as any;
    const error = req.query.error;
    if (error) return res.status(200).send(`<script>window.close();</script>`);
    if (!code) return res.status(400).send({ msg: 'wrong code' });
  
    const data = new URLSearchParams();
    data.append('client_id', process.env.CLIENT_ID!);
    data.append('client_secret', process.env.CLIENT_SECRET!);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', Auth.RedirectUrl);
    data.append('scope', Scopes.join(' '));
    data.append('code', code);
    axios
      .post('https://discord.com/api/oauth2/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      // hsaduhdsadhuuh
      .then(async (tokenResponse) => {
        
        // const userResponse = await axios.get(
        //   'https://discord.com/api/users/@me',
        //   {
        //     headers: {
        //       Authorization: `${tokenResponse.data.token_type} ${tokenResponse.data.access_token}`,
        //     },
        //   }
        // );
        console.log(tokenResponse.data)
      }).catch(err => {console.log(err)})

            // const userResponse = await axios.get(`https://discord.com/api/users/@me`,{
        //     headers: {
        //         Authorization: `${tokenResponse.data}`,
        //       },
        // }).catch(err => console.log(err))
        // console.log(userResponse)
        // const token = jwt.sign({
        //     data: tokenResponse.data,
        //     access_token: tokenResponse.data.access_token
        // },process.env.JWT_PASSWORD as string)
})
// http://localhost:5000/api/auth/login
export default router;