import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const authMiddleware = async (req, res, next) => {
    // console.log(req);
try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    // console.log(user);
    // const user = await User.findOne({ _id: decoded.id, 'authToken.token': token })
    if (!user) {
        return res.status(401).json({ message: 'Please authenticate' });
    }
    if (user.isOnHold) {
        return res.status(401).json({ message: 'Your account is on hold. Please contact the admin' });
    }
    req.user = user;
    next();
} catch (error) {
    return res.status(401).json({ message: 'Please authenticate' });
    }
}