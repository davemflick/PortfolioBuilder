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

UserSchema.statics.authenticate = function(email, password, callback){
	User.findOne({email}).exec(function(err, user){
		if(err){
			return callback(err);
		}else if(!user){
			var error = new Error('User not found');
			error.status = 401;
			error.details = {};
			return callback(error);
		}
		bcrypt.compare(password, user.password, function(error, result){
			if(result === true){
				return callback(null, user);
			} else if (result === false){
				let err = new Error('Passwords do not match');
				err.status = 401;
				return callback(err);
			} else {
				return callback(error);
			}
		})
	})
}

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