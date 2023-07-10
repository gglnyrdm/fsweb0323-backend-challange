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
server.use(express.json());

//3. routerlar
server.get('/', (req,res) => {
    res.json({message:"Server up and running..."})
})


//4. Error middleware
server.use((err,req,res,next) => {
    res.status(err.status || 500)
    .json({message:err.message || "Server error!.."})
})


//5. exports

module.exports = server;