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
		console.log(dbData);
		if(req.file){
			const filePath = req.file.path;
			const imageOutputPath = "src/uploads/images/" + req.file.originalname;
			if(fileType == 'image'){
				gm(filePath)
				.resize(resizeOps.width, resizeOps.height)
				.crop(cropOps.width, cropOps.height, cropOps.x, cropOps.y).write(imageOutputPath, function(err){
					if(err){
						next(err);
					} else {
						//remove temp file
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
						const uploadResponse = function(msg, utype){
							this.ok = true;
							this.filePath = imageOutputPath;
							this.msg = msg;
							this.uploadType = utype;
						} 
						if(dbData.type === 'portfolioImage'){
							Portfolio.updatePortfolio(dbData._id, {profilePicture: pics}, function(err, portfolio){
								if(err){return next(err);}
								let response = new uploadResponse('Image uploaded, portfolio updated', 'portfolioImage')
								response.portfolio = portfolio;
								res.json(response);
							})
						} else if (dbData.type === 'project'){
							Project.updateProjectById(dbData._id, {images: pics}, function(err, project){
								if(err){return next(err);}
								let response = new uploadResponse('Image uploaded, project updated', 'project');
								response.project = project;
								res.json(response);
							})
						} else if (dbData.type === 'projectAdd'){
							res.json(new uploadResponse('Image uploaded, project updated', 'projectAdd'))
						} else if (dbData.type === 'NewProjectImage'){
							res.json(new uploadResponse('Image uploaded, project not yet created', 'NewProjectImage'))
						} else if (dbData.type === 'certification'){
							if(dbData.cid){
								Portfolio.updateCertificateImage(dbData._id, dbData.cid, imageOutputPath, function(err, portfolio){
									if(err){return next(err);}
									let response = new uploadResponse('Certificate image uploaded, portfolio updated', 'CertificationImage')
									response.portfolio = portfolio;
									res.json(response);
								});
							} else {
								res.json(new uploadResponse('Certificate image uploaded, portfolio not updated', 'CertificationImage'))
							}
						} else if (dbData.type === 'banner'){
							Portfolio.updatePortfolio(dbData._id, {'styles.banner': imageOutputPath}, function(err, portfolio){
								if(err){return next(err);}
								let response = new uploadResponse('Image uploaded, banner saved', 'BannerImage');
								response.portfolio = portfolio;
								res.json(response)
							});
							
						} else {
							res.json(new uploadResponse('Unknown dbData type image uploaded', 'UnknownImage'))
						}
					}
				})
			} else if(fileType == 'pdf'){
				const newPath = 'src/uploads/pdfs/' + req.file.originalname;
				console.log("HERE");
				Portfolio.updatePortfolio(dbData._id, {resume: newPath}, function(err, portfolio){
					if(err){return next(err);}
					fs.rename(filePath, newPath, function(errory){
						if(errory){
							next(errory);
						} else {
							res.json({ok: true, msg: 'PDF uploaded', filePath: newPath, portfolio: portfolio, uploadType: 'pdf'});
						}
					});
				})
			}
		} else {
			res.json({ok: false, Msg: "You suck at uploading"});
		}
	}
}