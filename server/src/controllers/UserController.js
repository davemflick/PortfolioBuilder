var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
var gm = require('gm');
const bodyParser = require('body-parser');

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
		const boundaries = JSON.parse(req.headers.boundaries);
		const cropOps = boundaries.crop;
		const resizeOps = boundaries.resize;
		console.log(cropOps, resizeOps);
		if(req.file){
			const imagePath = req.file.path;
			const imageOutputPath = req.file.originalname;
			//lets change crop to resize?
			gm(imagePath)
				.resize(resizeOps.width, resizeOps.height)
				.crop(cropOps.width, cropOps.height, cropOps.x, cropOps.y).write(imageOutputPath, function(err){
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