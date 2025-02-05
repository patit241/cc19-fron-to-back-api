const createError = (status,message) =>{
    //Step 1 create Error and assign message
    const error = new Error(message)
    //Step 2 assign statusCode
    error.statusCode = status
    //Step 3 thrown error
    throw error
}

module.exports = createError