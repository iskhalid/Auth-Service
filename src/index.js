const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const ApiRoutes = require('./routes/index');
const UserRepository = require('./repository/user-repository');
const {Role} = require('./models/index')
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
        // const userRepository = new UserRepository();
        // const u1 = await userRepository.getById(1);
        // const r1 = await Role.findByPk(1);
        // const response = u1.addRole(r1);
        // console.log(response);

        if(process.env.DB_SYNC){
            console.log("fjdk");
            db.sequelize.sync({alter: true})
        }
        console.log(`Server started at ${PORT}`);
    })
}


prepareAndStartServer();