import express from 'express';
const router = express.Router();
import {onBoardRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, getMenuFromZomato} from '../controllers/restaurantRoutes';


router.post('/', onBoardRestaurant);
router.get('/:id', getRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

router.post('/scrape-zomato', getMenuFromZomato);
  
export default router;