const emotionService = require('../services/emotion.service');

const emotionController = {

    getAll: async (req, res) => {
        try {
            const emotions = await emotionService.find(); 
            res.status(200).json(emotions);
        } catch(err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' });
        }
    },
    getById: async (req, res) => {
    try {
        const emotion = await emotionService.findById(req.params.id)
        if (!emotion) {
            return res.status(404).json({ statusCode: 404, message: 'Émotion non trouvée' })
        }
        res.status(200).json(emotion)
    } catch(err) {
        console.log(err)
        res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' })
    }
},

    insert: async (req, res) => {
        try {
            const emotionToAdd = req.body;

            if(await emotionService.nameAlreadyExists(emotionToAdd.name)) { 
                res.status(409).json({
                    statusCode: 409,
                    message: `L'émotion ${emotionToAdd.name} existe déjà`
                });
            }

            const insertedEmotion = await emotionService.create(emotionToAdd);
            res.location(`/api/emotions/${insertedEmotion._id}`);
            res.status(201).json(insertedEmotion);

        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    delete: async (req, res) => {
        try {
            const emotionId = req.params.id;

            if(await emotionService.delete(emotionId)) {
                res.sendStatus(204);
            } else {
                res.status(404).json({
                    statusCode: 404,
                    message: "L'émotion n'existe pas"
                });
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur de la DB' });
        }
    }
}

module.exports = emotionController;