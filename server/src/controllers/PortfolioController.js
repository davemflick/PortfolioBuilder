var User = require('../models/User.js');
var Portfolio = require('../models/Portfolio.js');

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
	}
}