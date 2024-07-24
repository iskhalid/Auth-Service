const UserService = require("../services/user-service");

const userService = new UserService();

const create = async(req,res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        console.log(user)
        return res.status(200).json({
            data: user,
            success: true,
            message: "Successfully created user",
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong at user controller");
        return res.status(500).json({
            data:{},
            success: false,
            message: "not able to sign up",
            err: error
        })
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password)
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully signIn user",
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong at user controller");
        return res.status(500).json({
            data:{},
            success: false,
            message: "not able to sign in",
            err: error
        })
    }
}

const isAuthenticated = async(req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        console.log("responze is ",response);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully authenticated the user and token is valid",
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong at user controller");
        return res.status(500).json({
            data:{},
            success: false,
            message: "not able to sign in",
            err: error
        })
    }
}



module.exports = {
    create,
    signIn,
    isAuthenticated,
}