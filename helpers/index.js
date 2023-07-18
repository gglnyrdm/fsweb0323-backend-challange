const db = require("../data/db-config");

function formatResponse(data) {
        /*
        {
            "user_id":1,
            "username":"glnyrdm",

            "tweets": [
                {
                    "tweet_id":1,
                    "created_at": now,
                    "content": "o zaman dans, renk...",
                    "type_name": "tweet"
                },
                {
                    "tweet_id":2,
                    "created_at": now,
                    "content": "bu twitter çok bozdu",
                    "type_name":"tweet"
                }
            ]
        }
        */
      
}

async function getById (tweet_id){
    let tweetler = await db("Users as u")
                .leftJoin("Tweets as t", "t.user_id","u.user_id")
                .leftJoin("Tweet_type as tt", "tt.type_id", "t.type_id")
                .select("u.user_id","username", "t.tweet_id", "t.content","t.created_at","tt.type_name")
                .where("t.tweet_id", tweet_id);

    if(tweets.length == 0) {
        return null;
    }

    let responseTweetModel = {
        user_id: tweetler[0].user_id,
        username: tweetler[0].username,
        tweets: []
    }

    for (let i = 0; i < tweetler.length; i++) {
        const tweet = tweetler[i];
        let tweetModel = {
            tweet_id: tweet.tweet_id,
            created_at: tweet.created_at,
            content: tweet.content,
            type_name: tweet.type_name
        }
    }
}