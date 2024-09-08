import Restaurant from '../models/restaurantModel';
import { Request, Response } from 'express';

export const getMenu = async (req: Request, res: Response) => {
    try {
        // TODO: check request subdomain
        // console.log(req)
        const host = req.host;
        let restaurant;
        if (host == 'localhost') {
            restaurant = await Restaurant.findOne({ subDomain: 'jp' });
        }

        const origin = req.headers.origin;
        console.log(origin, "origin")
        // TODO: make it dynamic for all subdomains
        // const domainName = origin.split('//')[1].split(':')[0];
        // const subDomain = domainName.split('.')[0];
        // let restaurant;
            // } else {
    //     restaurant = await Restaurant.findOne({ subDomain });
    // }

       console.log(restaurant, "restaurant");
       if (!restaurant) {
        return res.status(404).send({
            message: 'Restaurant not found',
            success: false,
        });
    }

    // TODO: format the menu
    // Get unique categories
    const categories = new Set();
    // Typecast restaurant.menu as an array
    (restaurant.menu as any[]).forEach((item: any) => {
        categories.add(item.category);
    });
    // convert set to array
    const categoriesArray = Array.from(categories);
    console.log(categories, "categories")

      

    return res.render('menu1/index', {categories: categoriesArray, menu: restaurant.menu, layout: false});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}
