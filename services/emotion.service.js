const Emotion = require('../models/emotion.model');

const emotionService = {

    find: async () => {
        try {
            const emotions = await Emotion.find();
            return emotions;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },
    findById: async (id) => {
    try {
        const emotion = await Emotion.findById(id)
        return emotion
    } catch(err) {
        console.log(err)
        throw new Error(err)
    }
},

   nameAlreadyExist: async (name) => {
        try {
            const emotionFound = await Emotion.findOne({ name });
            if(emotionFound) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create: async (emotion) => {
        try {
            const emotionToAdd = Emotion(emotion);
            await emotionToAdd.save();
            return emotionToAdd;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    delete: async (id) => {
        try {
            const deletedEmotion = await Emotion.findByIdAndDelete(id);
            if(!deletedEmotion) return false;
            else return true;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = emotionService;