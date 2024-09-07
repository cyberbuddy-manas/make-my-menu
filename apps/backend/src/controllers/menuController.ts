import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';

export const getMenu = async (req: Request, res: Response) => {
    try {
        // TODO: check request subdomain
        // const origin = req.headers.origin;
        // const domainName = origin.split('//')[1].split(':')[0];
        // const subDomain = domainName.split('.')[0];
        let restaurant;
    // if (subDomain == 'localhost'){
    //     restaurant = await Restaurant.findOne({ subDomain: 'manas' });
    // } else {
    //     restaurant = await Restaurant.findOne({ subDomain });
    // }
    return res.render('menu1/index', {layout: false});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}
