var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');
var PortfolioController = require('./controllers/PortfolioController.js');
var UserController = require('./controllers/UserController.js');

const multer = require('multer');
const upload = multer({ dest: './uploads' })

//comment
//POST -> Register
router.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);

//POST -> login
router.post('/login', AuthenticationController.login);

//GET -> portfolio
router.get('/portfolio/:username', PortfolioController.findPortfolio);

//Update -portfolio
router.put('/portfolio/update/:id', PortfolioController.updatePortfolio);

//Update - userinformation then portfolio information

router.put('/user/update', AuthenticationControllerPolicy.updateUserInfo, UserController.updateUserInfo )

//POST -> First post a new project, then update correct portfolio
router.post('/project/add/:portfolioId', PortfolioController.addUserProject)

//PUT -> Uploading a user portfolio image
router.post('/user/upload/img', upload.single('image'), UserController.uploadPortfolioImage);

module.exports = router