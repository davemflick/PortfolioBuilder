const mongoose = require('mongoose');
const SkillSchema = require('./Skill');
var Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
	portfolioId: {type: Schema.ObjectId, required: true, ref: 'Portfolio'},
	name: {type: String, required: true, trim: true},
	description: {type: String, trim: true},
	link: {type: String, trim: true},
	stack: [SkillSchema],
	images: [
		{
			path: {type: String},
			isMain: {type: Boolean, default: true},
			createdOn: {type: Date, default: Date.now }
		}
	],
	createdOn: {type: Date, default: Date.now },
	updatedOn: {type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;