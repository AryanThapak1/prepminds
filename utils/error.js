class error extends Error{
    constructor(errorMessage,statusCode){
        super(errorMessage),
        this.statusCode=statusCode,
        this.status=`${statusCode}`.startsWith('4')?"Failed":"error",
        this.isOperational=true,

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports=error;