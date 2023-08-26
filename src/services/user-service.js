const UserRepository = require('../repository/user-repository');

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
            console.log("Something went wrong in the Service layer")
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