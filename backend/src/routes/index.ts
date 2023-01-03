import { Router } from "express";

import authRouter from './auth/auth'
import userRouter from './user/user'
import statsRouter from './stats/stats'
import premiumRoute from './premium/premium'
const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/stats', statsRouter)
router.use('/premium', premiumRoute)

export default router