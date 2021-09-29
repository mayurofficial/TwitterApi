const Tweet = require('../model/twitterSchema')


//create tweet controller
exports.createTweet = (req, res, next) => {
    const {userId,content,isRetweet} = req.body;
    Tweet.create({userId,content,isRetweet})
    .then(tweet=>{
        tweet.save();
        res.status(201).json({message:'Tweet created successfully'});
    })
    .catch(error=>{
        res.status(500).json({error:error.message});
    })
}

