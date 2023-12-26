const mailer=require('nodemailer');
const configMailer=require('../config/mailer.config');
const mailerConfig = require('../config/mailer.config');
require('dotenv/config');
module.exports.sendMail=(to,subject,htmlContent)=>{
    const transport=mailer.createTransport({
        host:configMailer.HOST,
        port:configMailer.PORT,
        secure:false,
        auth:{
            user:configMailer.USERNAME,
            pass:configMailer.PASSWORD
        }
    })
    const options={
        from:mailerConfig.FROM_ADDRESS,
        to:to,
        subject:subject,
        html:htmlContent
    }
    return transport.sendMail(options);
}