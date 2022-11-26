import {Router} from 'express'
import { client } from '../../bot/index'
import { Stats } from '../../utils'
const router = Router()

router.get('/', (req, res) => {
    
    const stats: Stats = {
        serverCount: client.guilds.cache.size,
        usersCount: client.users.cache.size
    }
    res.status(200).send({stats})
})

export default router;