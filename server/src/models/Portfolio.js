const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const PortfolioSchema = new mongoose.Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
	username: {type: String, required: true, unique: true, trim: true},
	isSetUp: {type: Boolean, default: false},
	isActive: {type: Boolean, deafult: true},
	setUpStage:{
		one:{type: Boolean, default: false},
		two:{type: Boolean, default: false}
	},
	aboutUser: {type: String, trim: true},
	profilePicture: [
	{
		path: {type: String, default: __dirname + '/client/src/assets/emptyProfile.png'},
		isMain: {type: Boolean, default: true},
		createdOn: {type: Date, default: Date.now }
	}
	],
	projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
	certifications: [{name: String, about: String, picturePath: String, dateObtained: Date}],
	skills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
	createdOn: {type: Date, default: Date.now },
	updatedOn: {type: Date, default: Date.now }
});

PortfolioSchema.statics.findUserPortfolio = function(portfolioId, callback){
	if(!portfolioId){
		let err = new Error("Portfolio Id not found");
		err.status = 400;
		err.details = {}
		return callback(err);
	}
	Portfolio.findById({_id: portfolioId}).exec(function(error, portfolio){
		if(error){return callback(error)};
		if(!portfolio){
			let err = new Error("Portfolio not found");
			err.status = 400;
			err.details = {}
			return callback(err);
		}
		return callback(null, portfolio);
	});
}

PortfolioSchema.statics.updatePortfolio = function(portfolioId, body, callback){
	if(!portfolioId){
		let err = new Error("Portfolio Id not found");
		err.status = 400;
		err.details = {}
		return callback(err);
	}
	Portfolio.findOneAndUpdate({_id: portfolioId}, {$set: body}, {new: true}).exec(function(error, portfolio){
		if(error){return callback(error);}
		if(!portfolio){
			let err = new Error("Portfolio not found");
			err.status = 400;
			err.details = {}
			return callback(err);
		}
		return callback(null, portfolio);
	});
}

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;