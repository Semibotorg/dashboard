import { Router } from "express";

import authRouter from './auth/auth'
import userRouter from './user/user'
import statsRouter from './stats/stats'
import premiumRoute from './premium/premium'
import alertsRoute from './alerts/index'
const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/stats', statsRouter)
router.use('/premium', premiumRoute)
router.use('/alerts', alertsRoute)

export default router