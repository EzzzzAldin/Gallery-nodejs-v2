const User = require('../models/user.model');
const mongoose = require('mongoose');
const Picture = require('../models/picture.model');

const DB_URL = process.env.DB_URI;

const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res) => {
    res.render('add-picture', {
        pageTitle: 'Add Picture',
        validationErrors: req.flash('validationErrors'),
        isUser: true,
        pictureAdded: req.flash('added')[0]
    });
};

exports.postAdd = async (req, res) => {
    try {
        if( validationResult(req).isEmpty()) {
            // Get User Id
            const id = req.session.userId
            // Get Picture In form
            req.body.picture = req.file.filename;
            // DB Connect
            await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
            // Get User Data
            const user = await User.findOne({_id: id});
            // Get Data Picture In Form
            const { picture, name } = req.body;
            // Add Picture To Picture Model
            let newPic = await new Picture({
                picture,
                name,
                user: id,
                like: 0
            });
            // Save New Pic In Pic Model
            await newPic.save();
            // Push Pic In User
            user.pictures.push(picture, name);
            await user.save();
            req.flash('added', true);
            res.redirect('/add');
        } else {
            req.flash('validationErrors', validationResult(req).array());
            res.redirect('/signup');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
};