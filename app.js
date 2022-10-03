require('dotenv').config();


const express = require('express');
const path =  require('path');
const socketIO = require('socket.io');

// Require Session
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// Router
const authRouter = require('./routes/auth.route');
const homeRouter = require('./routes/home.router');
const userAddRouter = require('./routes/userAdd.route');
const pictureRouter = require('./routes/picture.route');
const profileRouter = require('./routes/profile.route');

// Server Express
const app = express();
// Create Server Http To Sockit Io
const server = require('http').createServer(app);

// Run Sockit IO
const io = socketIO(server);

// Get Function lithen Comment
require('./sockets/like.socket')(io);
require('./sockets/comment.soket')(io);



// Init Static Files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
// Init Flash Sessions
app.use(flash());


// Init Session Store
const STORE = new SessionStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});
app.use(session({
    secret: 'Naruto and luffy and ichego and medoria and gon and ocuby and many chatcter the best hero',
    saveUninitialized: false,
    store: STORE
}));

// Init ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Port Init
const PORT = process.env.PORT || 3000;

// Router Use
app.use('/', authRouter);
app.use('/', userAddRouter);
app.use('/', homeRouter);
app.use('/picture', pictureRouter);
app.use('/', profileRouter);

// MidelWare Errors
app.get("/error", (req, res, next) => {
    res.status(500);
    res.render("error.ejs", {
        isUser: req.session.userId,
        pageTitle: "Error",
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        pageTitle: "Page Not Found",
    });
});

server.listen(PORT, () => {
    console.log(`Server run on Port ${PORT}`);
});