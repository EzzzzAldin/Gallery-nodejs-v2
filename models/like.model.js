const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    like: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pictures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;