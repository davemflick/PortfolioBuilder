const mongoose = require('mongoose');


const SkillSchema = new mongoose.Schema({
	name: {type: String, required: true, trim: true, unique: true},
	icon: {type: String, trim: true},
	createdOn: {type: Date, default: Date.now}
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;