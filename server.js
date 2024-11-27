const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/book-class', async (req, res) => {
    const { name, email, phone, gender, message } = req.body;

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
            subject: 'Class Booking Confirmation',
            text: `Hi ${name},\n\nThank you for booking a class with us! We look forward to helping you achieve your fitness goals.\n\nBest regards,\nEver Youth Gym`,
        });

        await transporter.sendMail({
            from: `"Ever Youth Gym" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Class Booking',
            text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nGender: ${gender}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        res.json({ success: true, message: 'Booking confirmed!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to book class.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});