const supportController = require('../controllers/support.controller')
const authenticationMiddleware = require('../middlewares/authentication.middleware')

const supportRouter = require('express').Router()

supportRouter.route('/:id')
    .delete(
        authenticationMiddleware(),
        supportController.delete
    )

module.exports = supportRouter