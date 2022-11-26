import { Router } from "express";

import authRouter from './auth/auth'
import userRouter from './user/user'
import statsRouter from './stats/stats'
const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/stats', statsRouter)

export default router