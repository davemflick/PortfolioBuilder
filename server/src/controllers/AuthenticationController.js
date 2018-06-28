var User = require('../models/User.js');

module.exports = {
	//register middleware
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
				req.session.userId = user._id;
				return res.json({Ok: true, Msg: 'User successfuly created'})
			});
		} else {
			var err = new Error("Email and full name required");
			err.status = 400;
			err.details = {email: req.body.email, fname: req.body.fname, lname: req.body.lname}
			return next(err);
		}
	},

	async login(req, res, next){
		if(!req.body.email || !req.body.password){
			let error = new Error("Email and Password Required");
			error.status = 400;
			error.details = {};
			return next(err);
		}
		User.authenticate(req.body.email, req.body.password, (err, user)=>{
			if(err){
				let error = new Error("Invalid Credentials");
				error.status = 401;
				error.details = {};
				return next(err);
			}
			req.session.userId = user._id;
			var userReturn = {
				email: user.email,
				name: {first: user.name.first, last: user.name.last}
			}
			return res.json({Ok: true, Msg: 'Successful user login', User: userReturn})
		})
	}
}