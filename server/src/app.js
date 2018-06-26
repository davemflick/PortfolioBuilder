const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const app = express();


//set up mongodb / mongoose
mongoose.connect("mongodb://localhost:27017/portbuilder");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
require('./routes')(app); // pass in route to routes.js

app.listen(config.port, ()=>{
	console.log('Express Server Running')
})