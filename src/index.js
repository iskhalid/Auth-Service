const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const ApiRoutes = require('./routes/index')
const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use("/api",ApiRoutes)

    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`);
    })
}


prepareAndStartServer();