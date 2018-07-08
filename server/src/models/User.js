var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
		name: {
		first: {type: String, required: true, trim: true},
		last: {type: String, required: true, trim: true}
	},
	username: {type: String, required: true, unique: true, trim: true},
	email: {type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	portfolioIsSetUp: {type: Boolean, default: false},
	portfolio: {type: Schema.Types.ObjectId, ref: 'Portfolio'}
});

UserSchema.statics.authenticate = function(emailOrUsername, password, callback){
	User.findOne({$or: [{'email': emailOrUsername}, {'username': emailOrUsername}]}).exec(function(err, user){
		if(err){
			return callback(err);
		}else if(!user){
			var error = new Error('User not found');
			error.status = 401;
			error.details = {};
			return callback(error);
		}
		bcrypt.compare(password, user.password, function(error, result){
			if(error){return callback(err);}
			if(result === true){
				return callback(null, user);
			} else {
				var err = new Error('Passwords do not match');
				err.status = 401;
				return callback(err);
			}
		})
	})
}

UserSchema.statics.findByUsername = function(username, callback){
	User.findOne({username}).exec(function(err, user){
		if(err){
			return callback(err);
		}
		if(!user){
			let error = new Error(`User ${username} could not be found.`);
			error.status = 400;
			return callback(error);
		}
		const account = { _id: user._id, name: user.name, email: user.email, username: user.username, portfolio: user.portfolio};
		callback(null, account);
	});
}

UserSchema.statics.updateUserInfo = function(userId, updateData, callback){
	User.findByIdAndUpdate(userId, updateData, {new: true}).exec(function(err, user){
		if(err){return callback(err);}
		if(!user){
			let error = new Error(`User ${username} could not be found and/or updated.`);
			error.status = 400;
			return callback(error);
		}
		console.log("HERE")

		const account = { _id: user._id, name: user.name, email: user.email, username: user.username, portfolio: user.portfolio};
		callback(null, account);
	});
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