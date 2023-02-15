import {Router} from 'express'
import redditRoute from './reddit'
import twitchRoute from './twitch'
import youtubeRoute from './youtube'
import twitterRoute from './twitter'

const router = Router()

router.use('/twitch', twitchRoute)
router.use('/twitter', twitterRoute)
router.use('/reddit', redditRoute)
router.use('/youtube', youtubeRoute)


export default router;