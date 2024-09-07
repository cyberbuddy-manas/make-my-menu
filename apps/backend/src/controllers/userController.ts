import { Request, Response } from 'express';
import User from '../models/userModel';

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