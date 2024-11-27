const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

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
            to: email,  // User's email for contact form confirmation
            subject: 'We Received Your Message',
            text: `Hi ${name},\n\nThank you for reaching out to us! We have received your message and will get back to you shortly.\n\nBest regards,\nEver Youth Gym`,
        });

        // Send email to admin (reachus@everyouthgym.in) about the new contact form message
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in', // Admin email to receive the contact form details
            subject: 'New Contact Form Submission',
            text: `New contact form submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        // Send success response
        res.json({ success: true, message: 'Your message has been sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
