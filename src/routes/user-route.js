const express = require('express')
const userController = require('../controllers/user-controller')
const userRouter = express.Router()

// @ENDPOINT http://localhost:8000/api/users
userRouter.get('/users',userController.listUsers)
userRouter.patch('/user/updaterole',userController.updateRole)
userRouter.delete('/user/:id',userController.deleteUser)






module.exports=userRouter