const roleAuthorizationMiddleware=(roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                statusCode:403,
                message:'Vous n\'avez pas les droits pour effectuer cette action'
            })

        }else{
            next()
        }
    }
}
module.exports=roleAuthorizationMiddleware