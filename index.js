require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./src/middlewares/error')
const notFoundHandler = require('./src/middlewares/notFound')
const authRouter = require('./src/routes/auth-route')
const userRouter = require('./src/routes/user-route')


//Middlewares
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // show log terminal
app.use(express.json()) // for read json


//Routing
app.use('/api',authRouter)
app.use('/api',userRouter)




//error and notfound handler
app.use(notFoundHandler)
app.use(errorHandler)

//start server
app.listen(process.env.PORT ,()=>{console.log(`Server is running on port ${process.env.PORT }`)})