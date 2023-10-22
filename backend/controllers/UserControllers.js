const User = require('../models/UserModel');
const userotp = require('../models/userOtp');
const createToken = require('../token/createToken');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config()
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});


const signUp = async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body;
        if (!fullname || !email || !password || !phone) {
            return res.status(400).send('Please fill in all details');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }
        const user = await User.create({
            fullname,
            email,
            phone,
            password
        });
        // const newpassword = await bcrypt.hash(user.password, 10)
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                token: createToken(user._id)
            });
        } else {
            return res.status(400).json({ error: "Failed to create user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ Error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await user.matchPassword(password);
            if (isMatch) {
                res.status(201).json({ status: 201, user })
            } else {
                return res.status(400).send('wrong password');
            }
        } else {
            return res.status(400).send('Email not found');
        }

    } catch (error) {
        console.error(error);
        return res.status(400).send(error.message);
    }
};

const userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await User.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }


                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        return res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        return res.status(200).json({ message: "Email sent Successfully", otp: OTP })
                    }
                })

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        return res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        return res.status(200).json({ message: "Email sent Successfully", OTP: OTP })
                    }
                })
            }
        } else {
            return res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details", error })
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(401).json({ status: 401, message: "Enter your email" });
    }
    try {
        const userfind = await User.findOne({ email });

        // Token generation for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.PRIVATEKEY, {
            expiresIn: "1d"
        });

        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind._id}/${setusertoken.verifytoken}`,

            };

            transporter.sendMail(mailOptions, (error, info) => {

                if (error) {
                    console.log("Error:", error);
                    return res.status(401).json({ status: 401, message: "Email not sent " });
                } else {
                    console.log("Email sent succesfully" + info.response);
                    return res.status(201).json({ status: 201, message: "Email sent successfully" });
                }
            });
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Invalid user" });
    }
};

const forgotPassword = async (req, res) => {
    const { id, token } = req.params
    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        const verifyToken = jwt.verify(token, process.env.PRIVATEKEY);
        if (validuser && verifyToken._id) {
            return res.status(201).json({ status: 201, validuser })
        } else {
            return res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        return res.status(401).json({ status: 401, error })
    }
}
const updatedPassword = async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, process.env.PRIVATEKEY);

        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword }, { new: true });
            await setnewuserpass.save();

            return res.status(201).json({ status: 201, setnewuserpass })

        } else {
            return res.status(401).json({ status: 401, message: "user not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}
module.exports = { signUp, loginUser, resetPassword, userOtpSend, forgotPassword, updatedPassword };
