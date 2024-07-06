const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/referrals', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course, message } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
        message
      }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: 'Course Referral',
      text: `You have been referred to the ${course} course by ${referrerName}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error: ', error);
        return res.status(500).json({ error: 'Email sending failed' });
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(referral);
  } catch (error) {
    console.error('Server error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
