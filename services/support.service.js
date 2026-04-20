const Song = require('../models/song.model');
const Support = require('../models/support.model');

const songService = {

    find: async () => {
        try {
            const songs = await Song.find()
                .populate({ path: 'emotionId', select: { name: 1, emoji: 1, color: 1 } })
                .populate({ path: 'userId', select: { email: 1 } });
            return songs;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    findById: async (id) => {
        try {
            const song = await Song.findById(id)
                .populate({ path: 'emotionId', select: { name: 1, emoji: 1, color: 1 } })
                .populate({ path: 'userId', select: { email: 1 } });
            return song;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create: async (songData, userId) => {
        try {
            const songToAdd = Song({ ...songData, userId });
            await songToAdd.save();
            return songToAdd;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    update: async (id, songData, userId) => {
        try {
            const song = await Song.findById(id);
            if(!song) return null;
            // Vérifier que c'est bien SA chanson
            if(song.userId.toString() !== userId) return null;
            // Modifier
            song.title = songData.title || song.title;
            song.artist = songData.artist || song.artist;
            song.story = songData.story || song.story;
            await song.save();
            return song;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    delete: async (id, userId) => {
        try {
            const song = await Song.findById(id);
            if(!song) return false;
            // Vérifier que c'est bien SA chanson
            if(song.userId.toString() !== userId) return false;
            await Song.findByIdAndDelete(id);
            return true;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    findSupports: async (songId) => {
        try {
            const supports = await Support.find({ songId })
                .populate({ path: 'userId', select: { email: 1 } });
            return supports;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    createSupport: async (supportData, songId, userId) => {
        try {
            const supportToAdd = Support({ ...supportData, songId, userId });
            await supportToAdd.save();
            return supportToAdd;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = songService;