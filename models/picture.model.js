const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true,
        trim: true,
        
    },
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [{
        type: String,
        ref: 'Comment'
    }],
    like: {
        type: Number,
        ref: 'Like'
    },
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;

// exports.likePic = async 