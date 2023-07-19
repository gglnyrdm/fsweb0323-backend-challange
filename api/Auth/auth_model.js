const db = require('../../data/db-config')

const getByFilter = (filter) => {
    return  db('Users as u')
            .leftJoin('Roles as r',"u.role_id","r.role_id")
            .leftJoin("Follows as f", "u.user_id","f.user_id")
            .select("u.user_id",
            "u.username", 
            "u.email",
            "u.password", 
            "u.first_name", 
            "u.last_name", 
            "u.created_at",
            "r.role_id",
            "r.role_name",
            "f.following_id",
            "f.follower_id")
            .where(filter)
}

module.exports={getByFilter}