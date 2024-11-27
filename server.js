const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post('/book-class', async (req, res) => {
    const { name, email, phone, gender, message } = req.body;

    // Configure Nodemailer Transport for Hostinger SMTP
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'enquiry@everyouthgym.in',
            pass: 'Enqu1ry@2015123#',
        },
    });

    try {
        // Send email to the user (confirmation email)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: email,
            subject: 'Class Booking Confirmation',
            text: `Hi ${name},\n\nThank you for booking a class with us! We look forward to helping you achieve your fitness goals.\n\nBest regards,\nEver Youth Gym`,
        });

        // Send email to yourself (admin notification)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in',
            subject: 'New Class Booking',
            text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nGender: ${gender}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        res.json({ success: true, message: 'Booking confirmed!' });
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ success: false, message: 'Failed to book class.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
