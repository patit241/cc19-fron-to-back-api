const createError = require("../utils/createError")

const userController = {}

// 1. List all users
userController.listUsers = async (req , res, next)=>{
    try{
        res.json({message:"asds"})
    }catch(err){
        next(err)
    }
}

// 2. update role
userController.updateRole = async (req , res, next)=>{
    try{
        res.json({message:"asds"})
    }catch(err){
        next(err)
    }
}

// 3. delete user
userController.deleteUser = async (req , res, next)=>{
    try{
        res.json({message:"asds"})
    }catch(err){
        next(err)
    }
}


module.exports= userController