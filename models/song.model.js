const { Schema, model } = require('mongoose');
const songSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        artist: {
            type: String,
            required: true,
            trim: true
        },
        story: {
            type: String,
            required: true
        },
        helpedCount: {
            type: Number,
            default: 0  
        },
        deezerId: {
            type: String,
            default: null  
        },
        emotionId: {
            type: Schema.Types.ObjectId,
            ref: 'Emotion',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true  
        }
    },
    {
        collection: 'Song',
        timestamps: true
    }
)
const Song = model('Song', songSchema);
module.exports = Song;