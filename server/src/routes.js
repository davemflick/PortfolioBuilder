var express = require('express');
var router = express.Router();
var AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js');
var AuthenticationController = require('./controllers/AuthenticationController.js');
var PortfolioController = require('./controllers/PortfolioController.js');
var UserController = require('./controllers/UserController.js');
var fs = require('fs');

const multer = require('multer');
const nodemailer = require('nodemailer');

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

router.post('/mailer/send', function(req, res){
	//Do mailing stuff here
	let transporter = nodemailer.createTransport({
        host: process.env.AWS_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.AWS_USER_AUTH, // generated ethereal user
            pass: process.env.AWS_PASSWORD_AUTH // generated ethereal password
        }
    });

	//html for email
	let html = `<div style="width: 360px; padding: 10px;">
							<h2 style="padding: 5px;">Somebody has emailed you on Porteloper!</h2>
							<div style="width: 100px; padding: 5px; background-color: #ddd; display: inline-block;">Contact</div>
							<div style="width: 240px; padding: 5px; display: inline-block;">Billy Zain</div>
							<br>
							<div style="width: 100px; padding: 5px; background-color: #ddd; display: inline-block;">Message</div>
							<div style="width: 240px; padding: 5px; display: inline-block;">I like your portfolio, you sexy bitch</div>
							</div>`

    // setup email data 
    let mailOptions = {
        from: '"David Flick" <david@bluetonemedia.com>', // sender address
        to: 'davemflick@gmail.com', // list of receivers
        subject: 'Hello David', // Subject line
        text: 'Hello world? Yo', // plain text body
        html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
 	console.log(process.env.TEST_ABC)
	res.json({ok: true, body: req.body});
});


module.exports = router