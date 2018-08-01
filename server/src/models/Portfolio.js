const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const PortfolioSchema = new mongoose.Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
	username: {type: String, required: true, unique: true, trim: true},
	isSetUp: {type: Boolean, default: false},
	isActive: {type: Boolean, deafult: true, required: true},
	aboutUser: {type: String, trim: true},
	otherProfiles: {
		github: {type: String, trim: true},
		linkedin: {type: String, trim: true},
		otherPortfolio: {type: String, trim: true}
	},
	profilePicture: [
	{
		path: {type: String, default: __dirname + '/client/src/assets/emptyProfile.png'},
		isMain: {type: Boolean, default: true},
		createdOn: {type: Date, default: Date.now }
	}
	],
	projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
	resume: {type: String, trim: true},
	certifications: [{name: String, about: String, picturePath: String, dateObtained: Date}],
	skills: [{type: String, trim: true}],
	styles: {
		fontFamily: {type: String, trim: true, default: "'Roboto', sans-serif"}
	},
	createdOn: {type: Date, default: Date.now },
	updatedOn: {type: Date, default: Date.now }
});

function createError(msg, status, details){
	let err = new Error(msg);
	err.status = status;
	err.details = details;
	return err;
}
const noPortfolioError = createError("Portfolio not found", 400, {});
const noPortfolioIdError = createError("Portfolio Id not found", 400, {});

PortfolioSchema.statics.findUserPortfolio = function(portfolioId, callback){
	if(!portfolioId){
		return callback(noPortfolioIdError);
	}
	Portfolio.findById({_id: portfolioId}).populate('projects').exec(function(error, portfolio){
		if(error){return callback(error)};
		if(!portfolio){
			return callback(noPortfolioError);
		}
		return callback(null, portfolio);
	});
}

PortfolioSchema.statics.updatePortfolio = function(portfolioId, body, callback){
	if(!portfolioId){
		return callback(noPortfolioIdError);
	}
	Portfolio.findOneAndUpdate({_id: portfolioId}, {$set: body}, {new: true}).exec(function(error, portfolio){
		if(error){return callback(error);}
		if(!portfolio){
			return callback(noPortfolioError);
		}
		return callback(null, portfolio);
	});
}

PortfolioSchema.statics.addUserProject = function(portfolioId, project, callback){
	if(!portfolioId){
		return callback(noPortfolioIdError);
	}
	if(!project){
		return callback(noPortfolioError);
	}
	Portfolio.findOneAndUpdate({_id: portfolioId}, {$set:{setUpStage: {one: true, two: true}, isSetUp: true}, $push: {projects: project}}, {new: true}).populate('projects').exec(function(error, portfolio){
		if(error){return callback(error)};
		if(!portfolio){
			return callback(noPortfolioError);
		}
		return callback(null, portfolio);
	})
}

PortfolioSchema.statics.removeProject = function(portfolioId, projectId, callback){
	if(!portfolioId){
		return callback(noPortfolioIdError);
	}
	Portfolio.findOneAndUpdate({_id: portfolioId}, {$pull: {projects: {_id: projectId}}}, {new: true}).exec(function(error, portfolio){
		if(error){return callback(error);}
		if(!portfolio){
			return callback(noPortfolioError);
		}
		return callback(null, portfolio);
	});
}

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;