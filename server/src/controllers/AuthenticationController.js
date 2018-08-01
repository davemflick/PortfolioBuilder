var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

function jwtSignUser(user){
	const ONE_WEEK = 60 * 60 * 24 * 7;
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports = {
	//register middleware
	async register(req, res, next){
		if(req.body.email && req.body.username && req.body.fname && req.body.lname){
			let userData = {
				email: req.body.email,
				username: req.body.username,
				name: {
					first: req.body.fname,
					last: req.body.lname
				},
				password: req.body.password
			}
			//Initially create a new user
			User.create(userData, function(err, user){
				if(err){
					return next(err);
				}
				//req.session.userId = user._id;
				let returnUser = {
					_id: user._id,
					name: {first: user.name.first, last: user.name.last},
					username: user.username,
					email: user.email,
					portfolio: null
				}
				//Once user has _id create a portfolio instance for that user, passing _id and username
				Portfolio.create({userId: user._id, username: user.username, isActive: true}, function(err, portfolio){
					if(err){return next(err)};
					returnUser.portfolio = portfolio

					//Once portfolio instance created, update newly created user with portfolio _id
					User.update({_id: returnUser._id}, {portfolio: portfolio._id} ,function(err, user){
						if(err){return next(err);}
						return res.json({ok: true, Msg: 'User successfuly created', user: returnUser})
					})
				});
			});
		} else {
			var err = new Error("Email, username, and full name required");
			err.status = 400;
			err.details = {email: req.body.email, fname: req.body.fname, lname: req.body.lname, username: req.body.username}
			return next(err);
		}
	},

	async login(req, res, next){
		if(!req.body.emailOrUsername || !req.body.password){
			var error = new Error("Email/Username and Password Required");
			error.status = 400;
			error.details = {};
			return next(error);
		}
		User.authenticate(req.body.emailOrUsername, req.body.password, function(err, user){
			if(err){
				var error = new Error("Invalid Credentials");
				error.status = 401;
				error.details = {};
				return next(err);
			}
			var userReturn = {
				email: user.email,
				username: user.username,
				name: {first: user.name.first, last: user.name.last}
			}
			return res.json({ok: true, Msg: 'Successful user login', User: userReturn, token: jwtSignUser(user.toJSON())})
		})
	}
}