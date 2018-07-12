var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');

module.exports = {
	async updateUserInfo(req, res, next){
		User.updateUserInfo(req.body.userId, req.body.user, function(err, user){
			if(err){return next(err)};
			if(!user._id){
				var error = new Error("User not found");
				error.status = 400;
				return next(error);
			}
			let userPortfolioUpdate = {
				userId: user._id,
				username: user.username
			}
			Portfolio.updatePortfolio(req.body.portfolioId, userPortfolioUpdate, function(err, portfolio){
				if(err){return next(err);}
				return res.json({user, portfolio, ok: true});
			})
		})
	},

	async uploadPortfolioImage(req, res, next){
		console.log(req.body);
		console.log(req.file);
		if(req.file){
			res.json(req.file);
		} else {
			res.json({Ok: false, Msg: "You suck at uploading"});
		}
	}
}