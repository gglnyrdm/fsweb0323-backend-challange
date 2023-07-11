const db = require('../../data/db-config');

const getAll = () => {
    return db('Tweets as t')
            .leftJoin('Users as u', "u.user_id","t.user_id")
            .leftJoin("Tweet_type as ty", "t.type_id", "ty.type_id")
            .select("t.tweet_id", 
                    "t.created_at", 
                    "t.content",
                    "u.user_id",
                    "u.username", 
                    "ty.type_id",
                    "ty.type_name"
                    )
}

const getById = async (tweet_id) => {
    const tweet = await db("Tweets as u")
            .leftJoin('Users as u', "u.user_id","t.user_id")
            .leftJoin("Tweet_type as ty", "t.type_id", "ty.type_id")
            .select("t.tweet_id", 
                    "t.created_at", 
                    "t.content",
                    "u.user_id",
                    "u.username", 
                    "ty.type_id",
                    "ty.type_name"
                    )
            .where("t.tweet_id",tweet_id)
            .first()
    return tweet;
}

const getByFilter = async(filter) => {
    return await db('Tweets as t')
                .leftJoin('Users as u', "u.user_id","t.user_id")
                .leftJoin("Tweet_type as ty", "t.type_id", "ty.type_id")
                .select("t.tweet_id", 
                        "t.created_at", 
                        "t.content",
                        "u.user_id",
                        "u.username", 
                        "ty.type_id",
                        "ty.type_name"
                        )
                .where(filter)
}

const create = async(model) => {
    let [tweet_id] = await db('Tweets').insert(model);
    return getById(tweet_id);
}

const remove = async(tweet_id) => {
    return await db('Tweets').where({tweet_id:tweet_id}).del();
}

const update = async(tweet_id, tweet) => {
    await db('Tweets').where({tweet_id:tweet_id}).update(tweet);
    return getById(tweet_id);
}

module.exports = {
    getAll,
    getByFilter,
    getById,
    create,
    update,
    remove

}