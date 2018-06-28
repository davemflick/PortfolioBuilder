var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true, trim: true},
	name: {
		first: {type: String, required: true, trim: true},
		last: {type: String, required: true, trim: true}
	},
	password: {type: String, required: true},
	createdAt: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;