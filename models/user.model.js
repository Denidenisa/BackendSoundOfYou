const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['User', 'Admin'],
            default: 'User'
        }
    },
    {
        collection: 'User',
        timestamps: true
    }
);

const User = model('User', userSchema);

module.exports = User;