const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI;

const User = require('../models/user.model');

const bcrypt = require('bcrypt');
// Init Validion Result
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req, res) => {
    res.render('signup', {
        pageTitle: 'Signup',
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false
    });
};

exports.postSignup = async (req, res) => {
    try {
        if( validationResult(req).isEmpty()) {
            // Db connect
            await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
            // Get Data User
            const checkUser = await User.findOne({email: req.body.email});
            if(checkUser) {
                // If user Is Found In DB
                res.render('autherr', {
                    pageTitle: 'Error Signup',
                    err: 'Email Is Used',
                    isUser: false,
                })
            } else {
                // If User Is Not Found In DB
                // Get Image In Form
                req.body.image = req.file.filename;
                const saltRounds = 10;
                // Hidden Password In DB
                const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                // Create New User
                let user = new User ({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    image: req.body.image
                });
                await user.save();
                res.redirect('/login');
            }
        } else {
            req.flash('validationErrors', validationResult(req).array());
            res.redirect('/signup')
        }
    } catch (error) {
        res.redirect('/error');
    }
};

exports.getLogin = (req, res) => {
    res.render('login', {
        // Show Error auth in Login Page
        pageTitle: "Login",
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false
    })
};

exports.postLogin = async (req, res) => {
    try {
        if( validationResult(req).isEmpty()) {
        // DB Connect
            await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
            // Get Data User
            const user = await User.findOne({email: req.body.email});
            if(!user) {
                // If User Is Not Found In DB
                res.render('autherr', {
                    pageTitle: 'Error Login',
                    err: 'there is no user matches this email',
                    isUser: false
                })
            } else {
                // If User Is Found In DB
                // Compare Password Input And Password In DB
                const comp = await bcrypt.compare( req.body.password, user.password);
                if(comp) {
                    // If Password Is correct Pass Data
                    req.session.userId = String(user.id);
                    req.session.name = user.username;
                    req.session.image = user.image;
                    res.redirect('/');
                } else {
                    // If Password Is incorrect
                    res.render('autherr', {
                        pageTitle: 'Error Login',
                        err: 'the Password is incorrect',
                        isUser: false
                    })
                }
            };
        } else {
            req.flash('validationErrors', validationResult(req).array());
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/error');
    }
};

exports.logout = (req, res) => {
    // Delete user of Session DB
    req.session.destroy(() => {
        res.redirect('/login')
    });
};