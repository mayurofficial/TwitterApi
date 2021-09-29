const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Types.ObjectId, 
        require: true 
    },
    content: { 
        type: String, 
        require: true 
    },
    likes: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    comments: [
        {
            userId:{ 
                type: mongoose.Types.ObjectId, 
                ref: 'User' 
            },
            comment:{
                    type:String,
                    require:true
                }
            }
        ]
});


//Creating model
const Tweet = mongoose.model('Tweet',TweetSchema);

//Exporting module
module.exports = Tweet;