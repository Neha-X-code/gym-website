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
            pass: 'Enqu1ry@2015123#', // Sender email password
        },
    });

    try {
        // Send email to user (confirmation email)
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: email,  // User's email for confirmation
            subject: 'We Have Received Your Message',
            text: `Hi ${name},\n\nThank you for contacting us. We will get back to you soon!\n\nBest regards,\nEver Youth Gym`,
        });

        // Send email to admin about the new contact message
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in', // Admin email to receive the contact details
            subject: 'New Contact Message',
            text: `New message received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nPlease follow up with the user.`,
        });

        // Send success response
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
