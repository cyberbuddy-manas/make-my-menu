import { Request, Response } from 'express';
import User from '../models/userModel';


export const sendLoginOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await User.findOne({ email });
        if (!user){
            // Create a new user and send otp
            await User.create({ email, 'loginToken.otp': otp });
            // TODO: Send OTP to email
            return res.status(200).json({ message: 'Login OTP sent' });
        }
        else{
            // Update the user with new otp valid for 5 minute
            user.loginToken = { otp, expires: new Date(Date.now() + 5 * 60 * 1000 ) };
            await user.save();
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
        const user = await User.create({ email, 'loginToken.otp': otp });
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
        return res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        // TODO: add a logger
        return res.status(500).json({ message: 'Internal server error' });
    }
}

