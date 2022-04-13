if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const catchAsync = require('./utils/catchAsync');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoDBStore = require('connect-mongo')(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/flashcard'
const res = require('express/lib/response');

const User = require('./models/User');

mongoose
	.connect(dbUrl)
	.then(() => {
		console.log('Mongo Connected');
	})
	.catch((err) => {
		console.log('mongo error');
	});

const app = express();

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
	store,
	name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
};

app.get('/login', (req, res) => {
    res.render('user/login')
});

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findAndValidate(email, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
		res.redirect('/');
    }
    else {
		res.redirect('/login')
    }
});

app.get('/', (req, res) => {
	res.render('home/index');
});

app.get('/flash_card', requireLogin, (req, res) => {
	res.render('flash_card/index');
});

app.get('/sticky_notes', requireLogin, (req, res) => {
	res.render('sticky_notes/index');
});

app.get('/pomodoro', requireLogin, (req, res) => {
	res.render('pomodoro/index');
});

app.post('/register',catchAsync(async (req, res, next) => {
	const user = new User(req.body.User);
	await user.save();
	req.session.user_id = user._id;
	res.redirect('/');
}));

app.get('/register', (req, res) => {
	res.render('user/new');
});

app.all('*', (req, res, next) =>{
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	const {statusCode = 500} = err;
	if(!err.message) err.message = "Oh No"
	res.status(statusCode).render('error',{err});
});

app.listen(5000, () => {
	console.log('Server Running');
});