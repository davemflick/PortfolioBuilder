const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const config = require('./config/config');
const app = express();

require('dotenv').config();


//set up mongodb / mongoose
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//use sessions for tracking logins
app.use(session({
	secret: process.env.SESSION_SECRET,//change this
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: db})
}));

//make user ID available
app.use((req,res,next)=>{
	res.locals.currentUser = req.session.userId;
	next();
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


const routes = require('./routes.js');
app.use('/', routes) // pass in route to routes.js

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.json({
  	ok: false,
    message: err.message,
    error: err || {}
  })
});

app.listen(config.port, ()=>{
	console.log(`Express Server Running on ${config.port}`)
})