import express from 'express';
const router = express.Router();
import { getMenu } from '../controllers/menuController';

router.get('/', getMenu);

export default router;