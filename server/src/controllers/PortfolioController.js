var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');
var Project = require('../models/Project.js');

module.exports = {
	//register middleware
	async findPortfolio(req, res, next){
		User.findByUsername(req.params.username, function(err, user){
			if(err){return next(err)};
			Portfolio.findUserPortfolio(user.portfolio, function(err, portfolio){
				if(err){return next(err);}
				return res.json({user, portfolio});
			});
		});
	},

	async updatePortfolio(req, res, next){
		Portfolio.updatePortfolio(req.params.id, req.body, function(err, portfolio){
			if(err){return next(err);}
			return portfolio ? res.json({Ok: true, portfolio}) : res.json({Ok: false, Msg: 'Portfolio did no update'});
		})
	},

	async addUserProject(req, res, next){
		Project.addUserProject(req.body, function(err, project){
			if(err){return next(err);}
			Portfolio.addUserProject(req.params.portfolioId, project, function(error, portfolio){
				if(error){return next(error);}
				return res.json({Ok: true, portfolio});
			});
		});
	}
}