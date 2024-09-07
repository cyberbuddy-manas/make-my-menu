import express from 'express';
const router = express.Router();
import {onBoardRestaurant, getRestaurant, getMyRestaurants, updateRestaurant, deleteRestaurant, getMenuFromZomato} from '../controllers/restaurantController';


router.post('/', onBoardRestaurant);
router.get('/', getMyRestaurants);
router.get('/:id', getRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

router.post('/scrape-zomato', getMenuFromZomato);
  
export default router;