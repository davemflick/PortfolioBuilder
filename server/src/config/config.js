
module.exports = {
	port: process.env.PORT || 8081,
	authentication:{
		jwtSecret: process.env.JWT_SECRET || 'secretboy buddy'
	}
}