const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();


//app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.listen(config.port, ()=>{
	console.log('Express Server Running')
})