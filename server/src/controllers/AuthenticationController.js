var User = require('../models/User.js');

module.exports = {
	async register(req, res, next){
		if(req.body.email && req.body.fname && req.body.lname){
			let userData = {
				email: req.body.email,
				name: {
					first: req.body.fname,
					last: req.body.lname
				},
				password: req.body.password
			}
			User.create(userData, function(err, user){
				if(err){
					return next(err);
				}
				return res.json({Ok: true, Msg: 'User successfuly created'})
			});
		} else {
			var err = new Error("Email and full name required");
			err.status = 400;
			err.details = {email: req.body.email, fname: req.body.fname, lname: req.body.lname}
			return next(err);
		}
	}
}