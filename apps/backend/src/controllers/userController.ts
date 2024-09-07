import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { sendEmail } from '../services/sesEmail';
import { loginOtpEmailTemplate } from '../services/emailTemplates/login';


export const sendLoginOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const user = await User.findOne({ email });
        if (!user){
            // Create a new user and send otp
            await User.create({ email, 'loginToken.otp': otp, 'loginToken.expires': new Date(Date.now() + 5 * 60 * 1000 ) });
            await sendEmail({
                recipients: [email],
                subject: "Login OTP - Make My Menu",
                template: loginOtpEmailTemplate({ email, otp}),
                ccRecipients: []
            });
            // TODO: Send Welcome email to new user
            return res.status(200).json({ message: 'Login OTP sent' });
        }
        else{
            // Update the user with new otp valid for 5 minute
            user.loginToken = { otp, expires: new Date(Date.now() + 5 * 60 * 1000 ) };
            await user.save();
                // Send the OTP to the user via email
            await sendEmail({
                recipients: [email],
                subject: "Reset Password OTP",
                template: loginOtpEmailTemplate({ email, otp}),
                ccRecipients: []
            });
            return res.status(200).json({ message: 'Login OTP sent' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email, 'loginToken.otp': otp });
        // TODO: check if login otp is expired
        if (!user){
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.isOnHold){
            return res.status(403).json({ message: 'User is on hold' });
        }
        if (user.loginToken.expires < new Date()){
            return res.status(400).json({ message: 'OTP expired' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.loginToken = { otp: '', expires: new Date() };
        // Saving the token in DB for SSO
        user.authToken.token = token;
        // Saving the token for 28 days
        user.authToken.expires = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);
        // TODO: Save login history
                
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        // TODO: add a logger
        return res.status(500).json({ message: 'Internal server error' });
    }
}

