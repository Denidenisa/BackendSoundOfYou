const argon2 = require('argon2');
const User = require('../models/user.model');

const authService = {

    // Vérifier si l'email existe déjà
    emailAlreadyExists: async (email) => {
        try {
            const userFound = await User.findOne({ email });
            if(userFound) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    // Créer un utilisateur
    create: async (user) => {
        try {
            //  hashe 
            const hashedPassword = await argon2.hash(user.password);
            // remplace password par  version hashée
            user.password = hashedPassword;
            // crée l'objet user à partir du model
            const userToCreate = User(user);
            // sauvegarde en DB
            await userToCreate.save();
            return userToCreate;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    // Trouver un utilisateur par email + password
    findByCredentials: async (credentials) => {
        try {
            //  cherche l'utilisateur par email
            const userFound = await User.findOne({ email: credentials.email });
            // Si pas trouvé → on sort
            if(!userFound) {
                return undefined;
            }
            //  vérifie si le mot de passe correspond
            const checkPassword = await argon2.verify(userFound.password, credentials.password);
            // Si mot de passe incorrect → on sort
            if(!checkPassword) {
                return undefined;
            } else {
                // Bon email + bon password → on renvoie le user
                return userFound;
            }
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = authService;
