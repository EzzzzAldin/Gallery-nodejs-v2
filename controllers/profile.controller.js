const Picture = require('../models/picture.model');

const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI;

exports.getProfile = async (req, res) => {
    try {
        // Get User Id
        const id = req.params.id;
        // If I Enter My Profile
        if (!id) return res.redirect('/profile/' + req.session.userId)
        // DB connect
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // Find Data Picture
        const pictures = await Picture.find({ user: id },
        ).populate({
                    path: 'user',
                    model: 'User',
                    select: 'username image'
                });
        res.render('profile', {
            pageTitle: pictures[0].user.username,
            isUser: true,
            user: req.session.userId,
            pictures: pictures
        })
    } catch (error) {
        res.redirect("/error");
        console.log(error);
    }
};