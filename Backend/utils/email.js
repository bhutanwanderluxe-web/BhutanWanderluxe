const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1. Create a transporter
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    // 2. define Email options
    const mailOptions = {
        from: process.env.MAIL_SENDER_DEFAULT,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    console.log(options.email, options.subject, options.message);
    // 3. Actually send the email
    await transport.sendMail(mailOptions);

};

module.exports = sendEmail;


