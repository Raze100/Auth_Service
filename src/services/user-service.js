const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverconfig')

const UserRepository = require('../repository/user-repository');
const ValidationError = require('../utils/validation-error');
const  AppErrors  = require('../utils/error-handler');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } 
        catch (error) {
            console.log("Service Error ===> ",error)
            if(error.name === 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong in the Service layer")
            // throw new AppErrors(
            //     'ServerError',
            //     'Something went wrong in Service',
            //     'Logical Issue Found',
            //     500
            // );
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            //step 1: fetch the user using the email
            const user = await this.userRepository.getByEmail(email);

            //step 2: compare incoming plain password with stored encrpyted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: "Incorrect Password !"}
            }

            //step 3:if passwords matched then create a token and send it to the user 
            const newJWT = this.createToken({
                email:user.email,
                id: user.id
            });
            return newJWT;


        } 
        catch (error) {
            console.log("Something went wrong in token creation");
            throw {error};
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn:'1h'});
            return result;
        } 
        catch (error) {
           console.log("Something went wrong in token creation");
           throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } 
        catch (error) {
            console.log("Something went wrong in token verification.");
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        } 
        catch (error) {
            console.log("Something went wrong in token verification.");
            throw {error};
        }
    }

    isAdmin(userId){
        try {
           return this.userRepository.isAdmin(userId);
        } 
        catch (error) {
            console.log("Something went wrong in token verification.");
            throw {error};
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: "No user with the corresponding token exists"}
            }
            return user.id;
        } 
        catch (error) {
            console.log("Something went wrong in token verification.");
            throw {error};
        }
    }

    async destroy(userId){
        try {
            await this.userRepository.destroy(userId);
            return true;
        } 
        catch (error) {
            console.log("Something went wrong in the Service layer")
            throw {error}; 
        }
    }

    async getById(userId){
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } 
        catch (error) {
            console.log("Something went wrong in the Service layer")
            throw {error};
        }
    }
}

module.exports = UserService;