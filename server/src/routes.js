var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');
var PortfolioController = require('./controllers/PortfolioController.js');
var UserController = require('./controllers/UserController.js');
var fs = require('fs');

const multer = require('multer');

let imgStorage = multer.diskStorage({
	destination: function(req, file, cb){
		file.mimetype == 'application/pdf' ? cb(null, './src/tempUploads/pdfs') : cb(null, './src/tempUploads/images');
	},
	filename: function(req, file, cb){
		cb(null, file.originalname );
	}
});

const upload = multer({ storage: imgStorage })

//comment
//POST -> Register
router.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);

//POST -> login
router.post('/login', AuthenticationController.login);

//GET -> Check token
router.get('/authenticate', AuthenticationController.checkTokenExpiration)

//GET -> portfolio
router.get('/portfolio/:username', PortfolioController.findPortfolio);

//Update -portfolio
router.put('/portfolio/update/:id', PortfolioController.updatePortfolio);

//Update - userinformation then portfolio information

router.put('/user/update', AuthenticationControllerPolicy.updateUserInfo, UserController.updateUserInfo )

//POST -> First post a new project, then update correct portfolio
router.post('/project/add/:portfolioId', PortfolioController.addUserProject)

//PUT -> Uploading a user portfolio image
router.post('/user/upload/img', upload.single('myfile'), UserController.uploadPortfolioImage);

//GET IMAGES
router.get('/src/uploads/:folder/:file', function(req, res){
	const file = `${__dirname}/uploads/${req.params.folder}/${req.params.file}`;
	if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
  	res.json({ok: false, msg: 'bad pathway'});
  }
});

//DELETE -> Project Image
router.put('/project/delete-img', PortfolioController.removeProjectImage);

//PUT -> update project
router.put('/project/update/:projectId', PortfolioController.editProject);

//DELETE -> Project
router.put('/project/delete/:portfolioId/:projectId', PortfolioController.deleteProject);


module.exports = router