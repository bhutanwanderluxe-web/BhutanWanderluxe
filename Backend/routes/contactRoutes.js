const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.post('/send', async (req, res) => {
    const { email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_SENDER_DEFAULT,
            to: 'bhutanwanderluxe@gmail.com', // your receiving email
            subject: `New Message from ${email}`,
            text: message,
            replyTo: email, //  This makes replying go to sender
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

module.exports = router;
