const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: 'Naruto Wallpapers.jpg'
    },
    pictures: [{
        type: String,
        ref: 'Picture'
    }],
    comments: [{
        type: String,
        ref: 'Comment'
    }],
    like: [{
        type: Number,
        ref: 'Like'
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

