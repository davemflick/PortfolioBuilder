
require('dotenv').config();

module.exports = {
	port: process.env.PORT || 8081,
	db: process.env.PORTELOPER_DB || "mongodb://localhost:27017/portbuilder",
	sessionSecret: process.env.SESSION_SECRET || 'my little secret',
	authentication:{
		jwtSecret: process.env.JWT_SECRET || 'secretboy buddy'
	}
}