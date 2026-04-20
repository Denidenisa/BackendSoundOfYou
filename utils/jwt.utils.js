const jwt = require('jsonwebtoken');

const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

const jwtUtils = {

    generate: (user) => {
        return new Promise((resolve, reject) => {

            
            const payload = {
                id: user._id,
                role: user.role
            }

            const options = {
                algorithm: 'HS512',
                expiresIn: '3d',
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            }

            jwt.sign(payload, JWT_SECRET, options, (error, token) => {
                if(error) {
                    reject(error);
                }
                resolve(token);
            })
        })
    },

    decode: (token) => {
        return new Promise((resolve, reject) => {

            if(!token) {
                reject(new Error('Pas de token reçu'));
            }

            const options = {
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            }

            jwt.verify(token, JWT_SECRET, options, (error, payload) => {
                if(error) {
                    reject(error);
                }
                resolve(payload);
            })
        })
    }
}

module.exports = jwtUtils;