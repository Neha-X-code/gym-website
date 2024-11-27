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
        service: 'Hostinger', // SMTP service for Hostinger
        auth: {
            user: 'enquiry@everyouthgym.in', // Your "From" email address
            pass: 'Enqu1ry@2015123#', // Your email password (app password for Hostinger)
        },
    });

    try {
        // Send email to the user (confirmation email)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>', // Your "From" email
            to: email, // Recipient's email (the user who booked)
            subject: 'Class Booking Confirmation',
            text: `Hi ${name},\n\nThank you for booking a class with us! We look forward to helping you achieve your fitness goals.\n\nBest regards,\nEver Youth Gym`,
        });

        // Send email to yourself (admin notification)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>', // "From" email
            to: 'reachus@everyouthgym.in', // Your admin email (to get the notification)
            subject: 'New Class Booking',
            text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nGender: ${gender}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        // Send success response
        res.json({ success: true, message: 'Booking confirmed!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to book class.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
