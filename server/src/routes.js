var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');

//comment
//POST -> Register
router.post('/register', AuthenticationControllerPolicy.register, function(req, res, next){
	if(req.body.email && req.body.fname && req.body.lname){
		let user = {
			email: req.body.email,
			name: {
				first: req.body.fname,
				last: req.body.lname
			}
		}

		return res.json({Ok: true, user})
	} else {
		var err = new Error("Email and full name required");
		err.status = 400;
		err.details = {email: req.body.email, fname: req.body.fname, lname: req.body.lname}
		return next(err);
	}
	
});

//POST -> login
router.post('/login', function(req, res, next){
	return res.json(req.body)
});

module.exports = router