//1. importlar

const express = require('express');
const server = express();


//2. global middleware



//3. routerlar
server.get('/', (req,res) => {
    res.json({message:"Server up and running..."})
})


//4. Error middleware



//5. exports

module.exports = server;