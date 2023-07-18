const router = require('express').Router();
const mw = require('./tweets-middleware');
const tweetModel = require('./tweets-model');
const authmw = require('../Auth/auth-middleware');

router.get('/', async(req,res,next) => {
    try {
        const tweets = await tweetModel.getAll();
        res.json(tweets)
    } catch (error) {
        next(error)
    }
})

router.get('/:tweet_id',mw.isIdExist,async (req,res,next) => {
try {
    const tweet_id = req.params.tweet_id;
    const tweet = await tweetModel.getById(tweet_id);
        res.json(tweet)
} catch (error) {
    next(error)
}
})

router.post('/',authmw.restricted ,mw.maxChar,async (req,res,next) => {
    try {
        let { content } = req.body;
        const insertedTweet = await tweetModel.create(content);
        res.status(201).json(insertedTweet);
    } catch (error) {
        next(error);
    }
})

router.delete('/:tweet_id',authmw.restricted,mw.isIdExist,async (req,res,next) => {
try {
    const { tweet_id } = req.params;
    const deleted = await tweetModel.remove(tweet_id);
    if(deleted){
        res.json({message:`Tweet id ${tweet_id},deleted`})
    }else {
        res.status(400).json({message:`Error in deleting tweet id ${tweet_id}!..`})
    }
} catch (error) {
    next(error)
}
})

module.exports = router;