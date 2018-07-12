var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
var gm = require('gm');

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
			const imagePath = req.file.path;
			const imageOutputPath = req.file.originalname;
			gm(imagePath).crop(200, 200, 0, 0).write(imageOutputPath, function(err){
				if(err){
					next(err);
				} else {
					console.log("DONE");
					res.json({ok: true, msg: 'Image uploaded'});
				}
			})
		} else {
			res.json({Ok: false, Msg: "You suck at uploading"});
		}
	}
}