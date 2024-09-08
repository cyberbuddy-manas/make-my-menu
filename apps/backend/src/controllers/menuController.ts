import Restaurant from '../models/restaurantModel';
import { Request, Response } from 'express';

export const getMenu = async (req: Request, res: Response) => {
    try {
        const host = req.hostname;  // Use hostname to get the subdomain
        let restaurant;

        if (host === 'localhost') {
            restaurant = await Restaurant.findOne({ subDomain: 'jp' });
        } else {
            const subDomain = host.split('.')[0];
            restaurant = await Restaurant.findOne({ subDomain });
        }

        if (!restaurant) {
            return res.status(404).send({
                message: 'Restaurant not found',
                success: false,
            });
        }

        // Get unique categories from the restaurant menu
        const categories = new Set();
        restaurant.menu.forEach((item: any) => {
            categories.add(item.category);
        });
        
        const categoriesArray = Array.from(categories);

        return res.render('menu1/index', { categories: categoriesArray, menu: restaurant.menu, layout: false });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
};
