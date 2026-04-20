const authService = require('../services/auth.service');
const jwtUtils = require('../utils/jwt.utils');

const authController = {
    register: async (req, res) => {
        try {
            const userToAdd = req.body;
            if(await authService.emailAlreadyExists(userToAdd.email)) {
                res.status(409).json({ 
                    statusCode: 409, 
                    message: 'Cet email est déjà utilisé' 
                });
            }
            const userCreated = await authService.create(userToAdd);
            const token = await jwtUtils.generate(userCreated) // ← ici !
            res.location(`/api/users/${userCreated._id}`);
            res.status(201).json({
                id: userCreated._id,
                email: userCreated.email,
                token
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    login: async (req, res) => {
        try {
            const credentials = req.body;
            const userFound = await authService.findByCredentials(credentials);
            if(!userFound) {
                res.status(401).json({ 
                    statusCode: 401, 
                    message: 'Les informations de connexion ne sont pas bonnes' 
                });
            } else {
                const token = await jwtUtils.generate(userFound) // ← userFound pas userCreated !
                res.status(200).json({ 
                    id: userFound._id,
                    email: userFound.email,
                    token
                });
            }
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = authController;