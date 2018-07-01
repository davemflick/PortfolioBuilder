const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const PortfolioSchema = new mongoose.Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
	username: {type: String, required: true, unique: true, trim: true},
	isSetUp: {type: Boolean, default: false},
	isActive: {type: Boolean, deafult: true},
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

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;