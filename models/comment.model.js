const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true,
        trim: true,
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pictures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;