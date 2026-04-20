const songService = require('../services/song.service')

const songController = {


   getAll: async (req, res) => {
    try {
        const emotionId = req.query.emotion || null
        const songs = await songService.find(emotionId)
        res.status(200).json(songs)
    } catch (err) {
        console.log(err)
        res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' })
    }
},

    getById: async (req, res) => {
        try {
            const id = req.params.id
            const song = await songService.findById(id)

            if (!song) {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Chanson non trouvée'
                });
            }

            res.status(200).json(song)
        } catch (err) {
            console.log(err)
            res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' })
        }
    },

    insert: async (req, res) => {
        try {
            const songToAdd = req.body

            const userId = req.user.id

            const insertedSong = await songService.create(songToAdd, userId)
            res.location(`/api/songs/${insertedSong._id}`)
            res.status(201).json(insertedSong)

        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },


    update: async (req, res) => {
    try {
        const id = req.params.id
        const newSongInfos = req.body
        const userId = req.user.id

        const updatedSong = await songService.update(id, newSongInfos, userId)

        if(!updatedSong) {
            return res.status(404).json({  
                statusCode: 404,
                message: 'Chanson non trouvée'
            });
        }

        return res.status(200).json(updatedSong)  
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
},

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.user.id

            if (await songService.delete(id, userId)) {
                res.sendStatus(204)
            } else {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Chanson non trouvée'
                });
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },


    getSupports: async (req, res) => {
        try {
            const songId = req.params.id
            const supports = await songService.findSupports(songId)
            res.status(200).json(supports)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },


    insertSupport: async (req, res) => {
        try {
            const songId = req.params.id
            const userId = req.user.id
            const supportToAdd = req.body

            const insertedSupport = await songService.createSupport(supportToAdd, songId, userId)
            res.status(201).json(insertedSupport)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = songController