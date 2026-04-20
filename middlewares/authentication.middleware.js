const jwtUtils = require('../utils/jwt.utils');

const authenticationMiddleware = () => {
    return async (req, res, next) => {
        try {
          
            const token = req.headers.authorization?.split(' ')[1];

           
            if(!token) {
                res.status(401).json({ 
                    statusCode: 401, 
                    message: 'Token manquant, vous devez être connecté' 
                });
            } else {
              
                const payload = await jwtUtils.decode(token);
               
                req.user = payload;
               
                next();
            }
        } catch(err) {
            console.log(err);
            res.status(401).json({ 
                statusCode: 401, 
                message: 'Token invalide' 
            });
        }
    }
}

module.exports = authenticationMiddleware;