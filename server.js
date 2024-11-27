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

    // Configure Nodemailer Transport with Hostinger's SMTP settings
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Hostinger's SMTP server
        port: 465, // SSL port
        secure: true, // Set to true for SSL
        auth: {
            user: 'enquiry@everyouthgym.in', // Sender email address
            pass: 'Enqu1ry@2015123#', // Sender email password (ensure correct password)
        },
    });

    try {
        // Send email to user (confirmation email)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: email,  // User's email for booking confirmation
            subject: 'Class Booking Confirmation',
            text: `Hi ${name},\n\nThank you for booking a class with us! We look forward to helping you achieve your fitness goals.\n\nBest regards,\nEver Youth Gym`,
        });

        // Send email to admin (reachus@everyouthgym.in) about the new class booking
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in', // Admin email to receive the class booking details
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
