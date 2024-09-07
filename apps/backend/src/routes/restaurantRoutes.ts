import express from 'express';
const router = express.Router();
import {onBoardRestaurant, getRestaurant, updateRestaurant} from '../controllers/restaurantRoutes';


router.post('/', onBoardRestaurant);
router.get('/:id', getRestaurant);
router.put('/:id', updateRestaurant);
  
export default router;