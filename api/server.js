//1. importlar
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')


//2. global middleware
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));


//3. routerlar
server.get('/', (req,res) => {
    res.json({message:"Server up and running..."})
})


//4. Error middleware



//5. exports

module.exports = server;