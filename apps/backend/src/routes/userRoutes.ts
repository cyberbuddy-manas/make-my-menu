import express from 'express';
const router = express.Router();
import {sendLoginOtp, login} from '../controllers/userController';
  
router.post('/send-login-otp', sendLoginOtp);
router.post('/login', login);
  
export default router;