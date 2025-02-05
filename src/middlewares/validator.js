const {z} = require("zod")

const Validator={}

//TEST validator
Validator.registerSchema = z.object({
    email:z.string().email("Email incorrect"),
    firstname : z.string().min(3,"Firstname ต้องมากกว่า 3"),
    lastname: z.string().min(3,"lastname ต้องมากกว่า 3"),
    password: z.string().min(6,"password ต้องมากกว่า 6"),
    confirmPassword : z.string().min(6,"confirmpassword ต้องมากกว่า 6")
}).refine((data)=>data.password === data.confirmPassword,{
    code:"match the password",
    message:"Password not macth with confirm passoword",
    path:["confirmPassword"]
})


Validator.loginSchema = z.object({
    email:z.string().email("Email incorrect"),
    password: z.string().min(6,"password ต้องมากกว่า 6"),
})



Validator.validateWithZod = (schema) =>(req,res,next) =>{
    try{
        console.log('hello middle wares')
        schema.parse(req.body)
        next()
    }catch(err){
        const msg = err.errors.map(el=>el.message)
        const errTxt = msg.join(",")
        const mergeError = new Error(errTxt)
        
        next(mergeError)
    }
}

module.exports =Validator
