import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';

export const getMenu = async (req: Request, res: Response) => {
    try {
        // TODO: check request subdomain
        const origin = req.headers.origin;
        console.log(origin, "origin");
        // const domainName = origin.split('//')[1].split(':')[0];
        
        // const subDomain = domainName.split('.')[0];
        // let restaurant;
    // if (subDomain == 'localhost'){
       const  restaurant = await Restaurant.findOne({ subDomain: 're' });
    // } else {
    //     restaurant = await Restaurant.findOne({ subDomain });
    // }
    // TODO: format the menu
    // Get unique categories
    const categories = new Set();
    // Typecast restaurant.menu as an array
    (restaurant.menu as any[]).forEach((item: any) => {
        categories.add(item.category);
    });
    console.log(restaurant);
    if (!restaurant) {
        return res.status(404).send({
            message: 'Restaurant not found',
            success: false,
        });
    }
      

    return res.render('menu1/index', {menu: restaurant.menu, layout: false});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}
