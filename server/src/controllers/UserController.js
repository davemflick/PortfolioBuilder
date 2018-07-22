var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
var Project = require('../models/Project.js');
var gm = require('gm');
const fs = require('fs');
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
		const dbData = boundaries.dbTarget;
		const cropOps = boundaries.crop;
		const resizeOps = boundaries.resize;
		const fileType = boundaries.type;
		if(req.file){
			const filePath = req.file.path;
			const imageOutputPath = "src/finalUploads/images/" + req.file.originalname;
			if(fileType == 'image'){
				gm(filePath)
				.resize(resizeOps.width, resizeOps.height)
				.crop(cropOps.width, cropOps.height, cropOps.x, cropOps.y).write(imageOutputPath, function(err){
					if(err){
						next(err);
					} else {
						console.log("DONE");
						fs.unlink(filePath, function(errorx){
							if(errorx){
								console.log(errorx);
							}
						})
						let pics;
						if(dbData.currentPictures){
							pics = dbData.currentPictures;
							pics.push({isMain: true, path: imageOutputPath});
						}
						if(dbData.type === 'portfolioImage'){
							Portfolio.updatePortfolio(dbData._id, {profilePicture: pics}, function(err, portfolio){
								if(err){return next(err);}
								res.json({ok: true, msg: 'Image uploaded, portfolio updated', filePath: imageOutputPath, portfolio: portfolio, uploadType: 'portfolioImage'});
							})
						} else if (dbData.type === 'project'){
							Project.updateProjectById(dbData._id, {images: pics}, function(err, project){
								if(err){return next(err);}
								res.json({ok: true, msg: 'Image uploaded, project updated', filePath: imageOutputPath, project: project, uploadType: 'project'});
							})
						} else if (dbData.type === 'projectAdd'){
							res.json({ok: true, msg: 'Image uploaded, project updated', filePath: imageOutputPath, uploadType: 'projectAdd'});
						} else if (dbData.type === 'NewProjectImage'){
							res.json({ok: true, msg: 'Image uploaded, project not yet created', filePath: imageOutputPath, uploadType: 'NewProjectImage'});
						}
					}
				})
			} else if(fileType == 'pdf'){
				const newPath = 'src/finalUploads/pdfs/' + req.file.originalname;
				fs.rename(filePath, newPath, function(errory){
					if(errory){
						console.log(errory);
					} else {
						res.json({ok: true, msg: 'PDF uploaded', filePath: newPath});
					}
				})
			}
		} else {
			res.json({Ok: false, Msg: "You suck at uploading"});
		}
	}
}