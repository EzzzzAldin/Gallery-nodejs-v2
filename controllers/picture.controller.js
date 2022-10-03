const Picture = require('../models/picture.model');
const Comment = require('../models/comment.model');
const Like = require('../models/like.model');
const User = require('../models/user.model');

const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI;

exports.getPictureById = async (req, res) => {
    try {
        const id = req.params.id;
        // DB connect
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // Find Data Picture
        const pictures = await Picture.findOne({_id: id}).populate({
            path: 'user',
            model: 'User',
            select: 'username image'
        });
        // Find Comment User In This Pic
        const comments  = await Comment.find({pictures: id}).populate({
            path: 'picture',
            model: 'Picture',
            select: 'commentBody'
        }).populate({
            path: 'user',
            model: 'User',
            select: 'username image'
        })
        res.render("picture", {
            pictures: pictures,
            isUser: req.session.userId,
            pageTitle: pictures.name,
            comments: comments,
            picId: req.params.id,
            // If User Press Like Add Class Red
            likeUser: await Like.findOne({user: req.session.userId ,pictures: req.params.id}),
            likePic: await Picture.findOne({_id: req.params.id}),
            // Get Data User To Real Time Comment
            user: await User.findOne({_id: req.session.userId})
        })
    } catch (error) {
        res.redirect("/error");
    }   
};

exports.likePic = async data => {
    try {
        // DB Connect
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // Cheak If User Press Like
        const userLike = await Like.findOne({user: data.userId ,pictures: data.picId});
        // If User Press disLike 
        if( userLike) {
            // Get Number Of Likes
            let like = - data.like;
            // Delete Like
            await Like.deleteMany(userLike[0]);
            // Decrement Likes Number
            await Picture.findOneAndUpdate({_id: data.picId}, {$inc : {like: like}});
        } else {
            // If User Press Like
            // Get User Data
            const user = await User.findOne({_id: data.userId});
            // Get Pic Data
            const picture = await Picture.findOne({_id: data.picId});
            // Get Number Of Like
            const like =  data.like;
            // Create New Like In Schema
            const newLike = new Like({
                like: like,
                user: user,
                pictures: picture
            });
            // Save New Like
            await newLike.save();
            user.like.push(like);
            // Increment Number Of Likes
            await Picture.findOneAndUpdate({_id: data.picId}, {$inc : {like: like}});
        }
    } catch (error) {
        throw new Error(error);
    }
}