const songController = require('../controllers/song.controller')
const authenticationMiddleware = require('../middlewares/authentication.middleware')

const songRouter = require('express').Router()

songRouter.route('/')
    .get(songController.getAll)
    .post(
        authenticationMiddleware(),
        songController.insert
    )

songRouter.route('/:id')
    .get(songController.getById)
    .patch(
        authenticationMiddleware(),
        songController.update
    )
    .delete(
        authenticationMiddleware(),
        songController.delete
    )

songRouter.route('/:id/supports')
    .get(songController.getSupports)
    .post(
        authenticationMiddleware(),
        songController.insertSupport
    )

module.exports = songRouter