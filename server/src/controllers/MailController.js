const nodemailer = require('nodemailer');
const emailTemplate = require("../emailTemplates/general.js");
const emailContactTemplate = require("../emailTemplates/contact.js");

module.exports = {
    sendEmail(req, res, next){
     if(req.body.secret !== process.env.EMAIL_SECRET){
        let err = new Error();
        err.status = 401;
        err.msg = 'Email secret incorrect';
        return next(err);
     }
     //comment

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
        let html = req.body.template === 'contact' ? emailContactTemplate.contactEmail(req.body) : emailTemplate.generalEmail(req.body);
        // setup email data 
        let mailOptions = {
            from: '"Porteloper" <porteloper@gmail.com>', // sender address
            to: req.body.toEmail, // list of receivers
            subject: 'Someone likes your Portfolio!', // Subject line
            html: html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.json({ok: true, data: info});
        });
        
    }
}
