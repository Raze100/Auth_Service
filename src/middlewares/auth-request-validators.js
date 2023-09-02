//same middleware can be used for signIn and signUp so we made it common as "validateUserAuth"

const validateUserAuth = (req, res, next) => {
    if( !req.body.email || !req.body.password )
    {
        //if any of the above params is missing we come inside the if block
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Email or Password Missing in the request"
        })
    }

    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "User ID missing in the request"
        })
    }

    next();
}

module.exports ={validateUserAuth , validateIsAdminRequest} ;