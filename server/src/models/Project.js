const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
	portfolioId: {type: Schema.Types.ObjectId, required: true, ref: 'Portfolio'},
	name: {type: String, required: true, trim: true},
	description: {type: String, trim: true},
	link: {type: String, trim: true},
	stack: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
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

function createError(msg, status, details){
	let err = new Error(msg);
	err.status = status;
	err.details = details;
	return err;
}
const noProjectError = createError("Project not found", 400, {});
const noProjectIdError = createError("Project Id not found", 400, {});

ProjectSchema.statics.addUserProject = function(projectData, callback){
	Project.create(projectData, function(err, project){
		if(err){return callback(err);}
		if(!project){
			let error = new Error("Could not create project");
			error.status = 401;
			return callback(error);
		}
		callback(null, project);
	});
}

ProjectSchema.statics.updateProjectById = function(projectId, body, callback){
	if(!projectId){
		return callback(noProjectIdError);
	}
	if(!body){
		return callback(noProjectError);
	}
	Project.findOneAndUpdate({_id: projectId}, {$set: body}, {new: true}).exec(function(error, project){
		if(error){
			return callback(error);
		}
		return callback(null, project);
	});
}

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;