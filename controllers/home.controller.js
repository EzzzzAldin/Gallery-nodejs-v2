const Picture = require('../models/picture.model');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI;

exports.getHome = async (req,res) => {
    try {
        // DB connect
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // Get All Pic
        const pictures = await Picture.find({});
        // Show Pic In Home
        res.render('home', {
            pictures: pictures,
            validationErrors: req.flash('validationErrors'),
            pageTitle: 'Home',
            isUser: req.session.userId,
        });
    } catch (error) {
        res.redirect('/error');
    }
};

exports.getSearch = async (req, res) => {
    try {
        // If User Don't Enter Name Pic
        if (!req.query.name) {
            res.render('search', {
                pageTitle: 'Search Photos',
                isUser: req.session.userId,
                pictures: null,
                searchMode: false
            })
        } else {
            // If User Enter Name Pic
            // DB Connect
            await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
            // Regualr Expresion To Find Pic By Name
            let query = { name: { $regex: new RegExp('^' + req.query.name, 'i') }};
            // Get Pic By NAme
            let pictures = await Picture.find(query);
            // Show All Pic Use This Name
            res.render('search', {
                pageTitle: 'Photos',
                isUser: req.session.userId,
                pictures: pictures,
                searchMode: true,
            })
        }
    } catch (error) {
        res.redirect('/error');
    }
};