const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let otpStore = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ernesto.dickens36@ethereal.email',
        pass: 'Kw6zNbMuE4yw6f44cX'
    }
});

// Function to generate OTP
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.json({ msg: "Email Already exists.", status: false });
        }

        const otp = generateOtp();
        otpStore[email] = otp;

        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <govind010119@gmail.com>',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error occurred while sending OTP:', error); 
                return res.status(500).send('Error sending OTP');
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                userName, email, password: hashPassword
            });

            // Removing the password field before sending the response
            const { password: _, ...userWithoutPassword } = user._doc;
            return res.json({ status: true, user: userWithoutPassword });
        });

    } catch (err) {
        next(err);
    }
};

module.exports.otpVerification = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Verify if the OTP matches
        if (otpStore[email] && otpStore[email] === otp) {
            // OTP is correct, user is verified
            delete otpStore[email]; // Remove the OTP after successful verification
            return res.json({ status: true, msg: "OTP verified successfully" });
        } else {
            // OTP is incorrect or expired
            return res.json({ status: false, msg: "Invalid or expired OTP" });
        }
    } catch (err) {
        next(err);
    }
};
