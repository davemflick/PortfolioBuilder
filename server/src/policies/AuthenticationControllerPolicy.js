const Joi = require('joi');

function createNewError(msg, status, details){
	var err = new Error(msg);
	err.status = status;
	err.details = details;
	return err;
}

module.exports = {
	register(req, res, next){
		if(req.body.password !== req.body.confirmPassword){
			var err = new Error("Passwords do not match");
			err.status = 400;
			return next(err);
		}

		const schema = {
			email: Joi.string().email(),
			password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
		}

		const user = {
			email: req.body.email,
			password: req.body.password
		}
		const {error, value} = Joi.validate(user, schema);
		if(error){
			switch(error.details[0].context.key){
				case 'email':
				next(createNewError('Bad email address', 400, null))
				break;
				case 'password':
				next(createNewError('Password must be alphanumeric and between 8-32 characters', 400, null))
				break;
				default:
				next(createNewError('Something went wrong validating', 500, null))
			}
		} else {
			next();
		}
	}
}