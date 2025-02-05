const express = require('express')
const authController = require('../controllers/auth-controller')
const { validateWithZod, registerSchema, loginSchema } = require('../middlewares/validator')

const authRouter = express.Router()






// @ENDPOINT http://localhost8000/api/register
authRouter.post('/register',validateWithZod(registerSchema),authController.register)
authRouter.post('/login',validateWithZod(loginSchema),authController.login)
authRouter.get('/currentuser',authController.currentUser)


//export
module.exports = authRouter

