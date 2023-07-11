const db = require('../../data/db-config');

const getAll = () => {
    return db('Users as u')
            .leftJoin('Roles as r',"u.role_id","r.role_id")
            .leftJoin("Follows as f", "u.user_id","f.user_id")
            .select("u.user_id",
                    "u.username", 
                    "u.email", 
                    "u.first_name", 
                    "u.lastname", 
                    "u.created_at",
                    "r.role_id",
                    "r.role_name",
                    "f.following_id",
                    "f.follower_id")
}

const getById = async (user_id) => {
    const user = await db("Users as u")
    .leftJoin('Roles as r',"u.role_id","r.role_id")
    .leftJoin("Follows as f", "u.user_id","f.user_id")
    .select("u.user_id",
            "u.username", 
            "u.email",
             "u.first_name", 
             "u.lastname", 
             "u.created_at",
             "r.role_id",
             "r.role_name",
             "f.following_id",
             "f.follower_id")
    .where("u.user_id",user_id)
    .first()
    return user;
}

const getByFilter = async(filter) => {
    return await db('Users as u')
            .leftJoin('Roles as r',"u.role_id","r.role_id")
            .leftJoin("Follows as f", "u.user_id","f.user_id")
            .select("u.user_id",
            "u.username", 
            "u.email", 
            "u.first_name", 
            "u.lastname", 
            "u.created_at",
            "r.role_id",
            "r.role_name",
            "f.following_id",
            "f.follower_id")
            .where(filter)
}

const create = async(model) => {
    let [user_id] = await db('Users').insert(model);
    return getById(user_id);
}

const remove = async(user_id) => {
    return await db('Users').where({user_id:user_id}).del();
}

const update = async(user_id, user) => {
    await db('Users').where({user_id:user_id}).update(user);
    return getById(user_id);
}

module.exports = {
    getAll,
    getByFilter,
    getById,
    create,
    update,
    remove

}