const User = require('../models/user.model');
const mongoose = require('mongoose');
const Comment = require('../models/comment.model');
const Picture = require('../models/picture.model');

const DB_URL = process.env.DB_URI;

exports.postComments = async (data) => {
    try {
            // DB Connect
            await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
            // Get User To Comment
            const user = await User.findOne({_id: data.user});
            // Get Pic User Comment 
            const picture = await Picture.findOne({_id: data.pictures});
            // Create New Comment
            const newComment = new Comment({
                commentBody: data.commentBody,
                user: data.user,
                pictures: data.pictures
            });
            await newComment.save();
            // Push Comment In Array Comment In User
            user.comments.push(data.commentBody);
            // Push Comment In Array Comment In Pic To Show comment
            picture.comments.push(data.commentBody);
            await user.save();
            await picture.save();
    } catch (error) {
        console.log(error);
    }
}