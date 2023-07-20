const jwt = require('jsonwebtoken');
const { JWT_SECRET,HASH_ROUND } = require('../../config');
const userModel = require('../Users/users-model');
const bcrypt = require('bcryptjs');

const authModel = require('./auth_model')



const hashPassword = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, Number(HASH_ROUND));
  console.log('Hashed Password:', req.body.password);
  next();
};

const passwordCheck = (req, res, next) => {
    try {
        if (!req.user) {
            next({ status: 401, message: "Invalid credentials!.." });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, req.user.password);
        if (isPasswordValid) {
            next();
        } else {
            next({ status: 401, message: "Invalid credentials!.." });
        }
    } catch (error) {
        next(error);
    }
};


const generateToken =  (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email
    };
    const options = {
      expiresIn: "4h"
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    req.user.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

const restricted = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
          if (!err) {
            req.decodedUser = decodedJWT;
            next();
          } else {
            next(err);
          }
        });
    } else {
      next({ status: 400, message: "Token is required!..." });
    }
  } catch (err) {
    next(err);
  }
};

const isEmailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await authModel.getByFilter({ "u.email":email });
    if (user.length === 0) {
      next({ status: 401, message: "Invalid credentials!.." });
    } else {
      req.user = user[0];
      next();
    }
  };

async function validUsername(req, res, next) {
  try {
    const { username } = req.body;
    const existName = await userModel.getByFilter({ username });
    if (existName) {
      res.status(422).json({ message: "Bu username kullanılıyor..." });
    } else {
      next({ status: 201, message: "Kullanıcı oluşturuldu." });
    }
  } catch (error) {
    next(error);
  }
}

async function checkUsername(req, res, next) {
  const { username } = req.body;
  const [user] = await userModel.getByFilter({ username: username });
  if (!user) {
    res.status(401).json({ message: "geçersiz kriter" });
  } else {
    req.user = user;
    next();
  }
}

const isEmailAvailable = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.getByFilter({ email });
  if (!user) {
    next();
  } else {
    next({ status: 400, message: "Email is not available!.." });
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
     next()
    } else {
      next({ status: 403, message: "Token is required to log out!..." });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  restricted,
  generateToken,
  validUsername,
  checkUsername,
  isEmailAvailable,
  hashPassword,
  logout,
  passwordCheck,
  isEmailExist
};
