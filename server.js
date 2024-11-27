const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment port for production

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle class booking form submission
app.post('/book-class', async (req, res) => {
    const { name, email, phone, gender, message } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'enquiry@everyouthgym.in',
            pass: 'Enqu1ry@2015123#',
        },
    });

    try {
        // Send confirmation to the user
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: email,
            subject: 'Class Booking Confirmation',
            text: `Hi ${name},\n\nThank you for booking a class!`,
        });

        // Send booking details to admin
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in',
            subject: 'New Class Booking',
            text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nGender: ${gender}\nMessage: ${message}`,
        });

        res.json({ success: true, message: 'Booking confirmed!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to book class.' });
    }
});

// Route to handle contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'enquiry@everyouthgym.in',
            pass: 'Enqu1ry@2015123#',
        },
    });

    try {
        // Send confirmation to the user
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: email,
            subject: 'We Received Your Message',
            text: `Hi ${name},\n\nThank you for reaching out to us! We will get back to you shortly.`,
        });

        // Send contact details to admin
        await transporter.sendMail({
            from: '"Ever Youth Gym" <enquiry@everyouthgym.in>',
            to: 'reachus@everyouthgym.in',
            subject: 'New Contact Form Submission',
            text: `New message received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        });

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
