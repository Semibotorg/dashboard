import { Router } from "express";

import authRouter from './auth/index'

const router = Router()

router.use('/auth', authRouter)

export default router