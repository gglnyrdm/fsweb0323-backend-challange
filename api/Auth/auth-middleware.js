const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const userModel = require('../Users/users-model');


const restricted = (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, JWT_SECRET, (err,decodedJWT) => {
                if(!err){
                    req.decodedJWT = decodedJWT;
                    next();
                }else {
                    next(err);
                }
            })
        }else {
            next({status:400, message:"Token required!.."})
        }
    } catch (error) {
        next(error)
    }
}

const generateToken = (user) => {
    const payload = {
        user_id: user.user_id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: "4h"
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token;
}

async function validUsername (req,res,next) {
    try {
        const { username } = req.body;
        const existName = await userModel.getByFilter({username})
        if (existName){
            res.status(422).json({message:"Bu username kullanılıyor..."})
        }else {
            next({status:201, message:"Kullanıcı oluşturuldu."})
        }
    } catch (error) {
        next(error);
    }
}


async function checkUsername(req,res,next){
    const {username} = req.body;
    const [user] = await userModel.getByFilter({username:username})
    if(!user){
        res.status(401).json({message:"geçersiz kriter"})
    }else{
        req.user = user;
        next();
    }
}

const isEmailAvailable = async (req,res,next)=> {
    const { email } = req.body;
    const user = await userModel.getByFilter({email});
    if(!user) {
        next()
    } else {
        next({status:400, message: "Email is not available!.."})
    }
}





module.exports = {
    restricted,
    generateToken,
    validUsername,
    checkUsername,
    isEmailAvailable
}