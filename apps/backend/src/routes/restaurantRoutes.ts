import express from 'express';
const router = express.Router();
import {onBoardRestaurant} from '../controllers/restaurantRoutes';
  
router.post('/onboard', onBoardRestaurant);

  
export default router;