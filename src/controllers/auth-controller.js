const prisma = require("../../configs/prisma")
const createError = require("../utils/createError")
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')


const authController = {}

authController.register = async(req,res,next) =>{
    try{
        // Step 1 req.body
        const {email,firstname,lastname,password,confirmPassword} = req.body

        // Step 2 validate
        // Step 3 Check already
        const checkEmail = await prisma.profile.findFirst({
            where:{
                email:email
            }
        })
        console.log(checkEmail)
        if(checkEmail){
            return createError(400,"email is alrdy exists")
        }
        // Step 4 Encrypt bcrypt
        const hashedPassword = bcrypt.hashSync(password,10)
        console.log(hashedPassword)
        // Step 5 Insert to DB
        const profile = await prisma.profile.create({
            data:{
                email,firstname,lastname,password:hashedPassword,
            }
        })

        // Step 6 Response
        res.json({message:"register success"})
    }catch(err){
        next(err)
    }
}

authController.login = async(req,res,next) =>{
    try{
        //Step 1 req.body
        const{email,password} = req.body
        //Step 2 check email and password
        const profile = await prisma.profile.findFirst({
            where:{
                email:email
            }
        })
        if(!profile){
            return createError(400,"email or password wrong")
        }
        const isMatch = bcrypt.compareSync(password,profile.password)
        console.log(isMatch)
        if(!isMatch){
            return createError(400,"email or password wrong")
        }
        //Step 3 Generate token
        const payload = {
            id:profile.id,
            email:profile.email,
            firstname:profile.firstname,
            lastname:profile.lastname,
            role:profile.role,
        }
        const token = jwt.sign(payload,process.env.SECRET,{
            expiresIn:"1d"
        })
        console.log(token)

        //Step 4 Response
        res.json({message:"Login success",
            payload,
            token
        })
    }catch(err){
        next(err)
    }
}

authController.currentUser = async (req,res,next)=>{
    try{
        
        res.json({message:"Hello, current user"})
    }catch(err){
        next(err)
    }
}

module.exports = authController