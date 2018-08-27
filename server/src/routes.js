var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');
var PortfolioController = require('./controllers/PortfolioController.js');
var UserController = require('./controllers/UserController.js');
var MailController = require('./controllers/MailController.js');
var gm = require('gm');
const bodyParser = require('body-parser');
var fs = require('fs');
var aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config();

//---------------------------------------------------------------
//saving files locally
let imgStorage = multer.diskStorage({
	destination: function(req, file, cb){
		file.mimetype == 'application/pdf' ? cb(null, './src/tempUploads/pdfs') : cb(null, './src/tempUploads/images');
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
});
const upload= multer({ storage: imgStorage })
//---------------------------------------------------------------


//---------------------------------------------------------------
// Saving files to AWS S3
// aws.config.update({
// 	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
// 	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
// 	region: 'us-east-1'
// })


// const s3 = new aws.S3();

// const uploadS3 = multer({
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: 'porteloper',
// 		acl: 'public-read',
// 		contentType: multerS3.AUTO_CONTENT_TYPE,
// 		key: function (req, file, cb) {
// 			console.log("GOING TO S3", file)
// 			const path = `images/${file.originalname}`
// 			cb(null, path);
// 		}
// 	})
// });


// const uploadMiddlewareTwo = function(req, res, next){
// 	console.log("MIDDLEWARE TWO");
// 	res.json({ok: 'maybe, idk'})
// }

//---------------------------------------------------------------

//PUT -> Uploading a user portfolio image
router.post('/user/upload/img', upload.single('myfile'), UserController.uploadPortfolioImage);
//router.post('/user/upload/img', upload.single('myfile'), UserController.uploadPortfolioImage);

//---------------------------------------------------------------

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

router.post('/mailer/send', MailController.sendEmail);


module.exports = router