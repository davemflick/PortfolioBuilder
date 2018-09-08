var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
var Project = require('../models/Project.js');
const fs = require('fs');

module.exports = {
	//register middleware
	async findPortfolio(req, res, next){
		User.findByUsername(req.params.username, function(err, user){
			if(err){return next(err)};
			Portfolio.findUserPortfolio(user.portfolio, function(err, portfolio){
				if(err){return next(err);}
				return res.json({user, portfolio, ok: true});
			});
		});
	},

	async updatePortfolio(req, res, next){
		Portfolio.updatePortfolio(req.params.id, req.body, function(err, portfolio){
			if(err){return next(err);}
			return portfolio ? res.json({ok: true, portfolio}) : res.json({ok: false, Msg: 'Portfolio did no update'});
		});
	},

	async addUserProject(req, res, next){
		Project.addUserProject(req.body, function(err, project){
			if(err){return next(err);}
			Portfolio.addUserProject(req.params.portfolioId, project, function(error, portfolio){
				if(error){return next(error);}
				return res.json({ok: true, portfolio});
			});
		});
	},

	async editProject(req, res, next){
		Project.updateProjectById(req.params.projectId, req.body, function(error, project){
			if(error){return next(error);}
			res.json({ok: true, project});
		})
	},

	async removeProjectImage(req, res, next){
		const project = req.body;
		const imgPath = project.imagePath;
		Project.findImageAndRemove(project.projectId, project.imageId, function(error, project){
			if(error){return next(error);}
			if(imgPath){
				fs.unlink(imgPath, function(errorx){
					if(errorx){
						console.log(errorx);
					}
				})
			}
			return res.json({ok: true, project});
		});
	},

	async deleteProject(req, res, next){
		Project.deleteProject(req.params.projectId, function(err, result){
			if(err){return next(err)};
			if(result.success){
				Portfolio.removeProject(req.params.portfolioId, req.params.projectId, function(err, portfolio){
					if(err){return next(err);}
					res.json({ok: true, msg: "Project deleted from portfolio", portfolio});
				});
			}
		})
	}
}