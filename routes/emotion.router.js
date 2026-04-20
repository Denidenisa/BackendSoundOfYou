const emotionController = require('../controllers/emotion.controller')
const authenticationMiddleware = require('../middlewares/authentication.middleware')
const roleAuthorizationMiddleware = require('../middlewares/roleAuthorization.middleware')

const emotionRouter = require('express').Router()

emotionRouter.route('/')
    .get(emotionController.getAll)
    .post(
        authenticationMiddleware(),
        roleAuthorizationMiddleware(['Admin']),
        emotionController.insert
    )
    
emotionRouter.route('/:id')
    .get(emotionController.getById) 
    .delete(
        authenticationMiddleware(),
        roleAuthorizationMiddleware(['Admin']),
        emotionController.delete
    )

module.exports = emotionRouter