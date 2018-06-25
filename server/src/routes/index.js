var express = require('express');
var router = express.Router();

//comment
//POST -> Register
router.post('/register', function(req, res, next){
	return res.json(req.body)
});

//POST -> login
router.post('/login', function(req, res, next){
	return res.json(req.body)
});

module.exports = router;