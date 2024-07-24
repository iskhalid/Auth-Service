const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong at user service layer");
            throw error
        }
    }

    async signIn(email,plainPassword){
        try {
            // step-1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming plain password with stores encrypted password
            const passwordMatch = bcrypt.compareSync(plainPassword,user.password);
            if(!passwordMatch){
               console.log("Password incorrect");
               throw {error: "Incorrect password"}
            }
            const newJwt = this.createToken({email:user.email, id:user.id})
            return newJwt;
        } catch (error) {
            console.log("something went wrong at user service layer");
            throw error
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: "Invalid Token"}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: "No user with the corresponding token exists"}
            }
            // console.log(object);
            return user.id;
        } catch (error) {
            console.log("Something went wrong at checking authentication");
            throw error;
        }
    }

     createToken(user) {
        try {
            const token = jwt.sign(user,JWT_KEY,{ expiresIn: '7d' })
            return token;
        } catch (error) {
            console.log("Something went wrong at create token",error);
            throw error
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong at verifying token",error);
            throw error
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        } catch (error) {
            console.log("Something went wrong at checking password");
            throw error;
        }
    }

}

module.exports = UserService;