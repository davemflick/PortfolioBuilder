const nodemailer = require('nodemailer');
const emailTemplate = require("../emailTemplates/general.js");

module.exports = {
    sendEmail(req, res, next){
        console.log("HERE");
     let transporter = nodemailer.createTransport({
        host: process.env.AWS_HOST,
        port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.AWS_USER_AUTH, // generated ethereal user
                pass: process.env.AWS_PASSWORD_AUTH // generated ethereal password
            }
        });

        console.log(req.body);
        //html for email
        let html = emailTemplate.generalEmail(req.body);

        // setup email data 
        let mailOptions = {
            from: '"Porteloper" <david@bluetonemedia.com>', // sender address
            to: 'davemflick@gmail.com', // list of receivers
            subject: 'Someone likes your Portfolio!', // Subject line
            html: html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log(info);
        });

        res.json({ok: true, body: req.body});
    }
}