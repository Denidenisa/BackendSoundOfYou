const authRouter = require('./auth.router');
const emotionRouter=require('./emotion.router')
const songRouter=require('./song.router')
const supportRouter=require('./support.router')

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: '🎵 Therapy Music API is running !' });
});

router.use('/auth',authRouter)
router.use('/emotions', emotionRouter)
router.use('/songs',songRouter)
router.use('/supports',supportRouter)



module.exports = router;