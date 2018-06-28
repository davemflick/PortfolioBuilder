var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true, trim: true},
	name: {
		first: {type: String, required: true, trim: true},
		last: {type: String, required: true, trim: true}
	},
	password: {type: String, required: true},
	createdAt: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){return next(err);}
		user.password = hash;
		return next();
	});
});

var User = mongoose.model('User', UserSchema);

module.exports = User;