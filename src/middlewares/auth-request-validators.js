const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Email or password missing in the  request"
        })
    }
    next();
}

const validateUserToken = (req,res,next) => {
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Token missing in the  request"
        })
    }

    next();
}

module.exports = {
    validateUserAuth,
    validateUserToken
}