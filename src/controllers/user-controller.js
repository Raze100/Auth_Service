const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "Successfully created a new user",
            success: true,
            data: response,
            err: {}
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted a city",
            err : {}
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        });
    }
}

const getById = async (req, res) => {
    try{
        const user = await userService.getById(req.params.id);
        return res.status(200).json({
            data: user,
            success: true,
            message: "Successfully fetched the user details",
            err: {}
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        });
    }
}



module.exports = {
    create , destroy , getById
}