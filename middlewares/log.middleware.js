const logMiddleware=()=>{
    return(req,res,next)=>{
        const method=req.method
        const url=req.url
        const date=new Date()

        console.log(`${method} ${url} ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
        next()
    }
}
module.exports=logMiddleware