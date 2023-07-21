const tweetModel = require('./tweets-model');

const maxChar = (req,res,next) => {
    let { content } = req.body;
    try {
        if(!content){
            res.status(400).json({message:"Tweet alanı boş olamaz..."})
        }else if(content.length > 140) {
            res.status(400).json({message:"tweet alanı 140 karakteri geçemez"})
        }else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

const isIdExist = async (req,res,next)=> {
    const { tweet_id } = req.params;
    const tweet = await tweetModel.getById(tweet_id);
    if(tweet){
        req.tweet = tweet;
        next()
    } else {
        next({status:400, message: `${tweet_id} id'li tweet bulunamadı!...`})
    }

}

module.exports = {
    maxChar,
    isIdExist
}