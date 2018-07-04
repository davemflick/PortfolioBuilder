var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');
var PortfolioController = require('./controllers/PortfolioController.js');

//comment
//POST -> Register
router.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);

//POST -> login
router.post('/login', AuthenticationController.login);

//GET -> portfolio
router.get('/portfolio/:username', PortfolioController.findPortfolio);

//Update -portfolio
router.put('/portfolio/update/:id', PortfolioController.updatePortfolio);

module.exports = router