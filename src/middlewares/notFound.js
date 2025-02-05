const notFoundHandler = (req,res,nex)=>{
    res.status(400).json({message:"path not found"})
}

module.exports = notFoundHandler