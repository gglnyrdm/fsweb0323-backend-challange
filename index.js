const server = require('./api/server');

const { PORT }= require('./config');

server.listen(PORT, () => {
    console.log(process.env.NODE_ENV);
    console.log(`Server is listening on port ${PORT}...`)
})