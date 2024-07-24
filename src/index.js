const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const ApiRoutes = require('./routes/index');
const UserRepository = require('./repository/user-repository');
const db = require('./models/index')
const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use("/api",ApiRoutes)

    app.listen(PORT,async()=>{
        // const uR = new UserRepository();
        // const user = await uR.getById(1);
        // console.log(user);
        if(process.env.DB_SYNC){
            console.log("fjdk");
            db.sequelize.sync({alter: true})
        }
        console.log(`Server started at ${PORT}`);
    })
}


prepareAndStartServer();