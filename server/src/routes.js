var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');

//comment
//POST -> Register
router.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);

//POST -> login
router.post('/login', function(req, res, next){
	return res.json(req.body)
});

module.exports = router