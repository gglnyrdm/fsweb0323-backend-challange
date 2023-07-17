const router = require('express').Router();
const mw = require('./auth-middleware');
const bcrypt = require('bcryptjs');
const userModel = require('../Users/users-model')

router.post('/register',mw.validUsername,mw.isEmailAvailable, async (req,res,next) => {
    try {
        let { username,email,password,first_name, last_name} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const inserted = await userModel.create({username:username,email:email,password:hashPassword,first_name:first_name,last_name:last_name});
        res.status(201).json(inserted);
    } catch (error) {
        next(error)
    }
})

module.exports = router;