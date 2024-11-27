const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-msg', async (req, res) => {
    const { name, email, phone, message } = req.body;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Ever Youth Gym" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Customer Queries/Messages Received',
            text: `Hi ${name},\n\nThank you for contacting us! We will look into your message. We look forward to helping you achieve your fitness goals.\n\nBest regards,\nEver Youth Gym`,
        });

        await transporter.sendMail({
            from: `"Ever Youth Gym" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Customer Queries/Messages',
            text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        res.json({ success: true, message: 'Message Sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});