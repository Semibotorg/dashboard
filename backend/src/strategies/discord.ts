import passport from 'passport'
import { Profile, Strategy } from 'passport-discord'
import { VerifyCallback } from 'passport-oauth2'
import { Auth, Scopes } from '../utils'
import jwt from 'jsonwebtoken'
passport.use(
    new Strategy({
        clientID: process.env.CLIENT_id!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/auth/callback',
        scope: ['identify', 'guilds', 'guilds.join']
    }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        console.log({
            accessToken,
            refreshToken,
        })
        const token = jwt.sign({
            accessToken,
            refreshToken
        },process.env.JWT_PASSWORD as any)
        done(null, token)
    })
)