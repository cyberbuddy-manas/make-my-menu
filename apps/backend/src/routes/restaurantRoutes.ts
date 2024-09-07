import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';
import { IRestaurant } from '../models/restaurantModel';

export const onBoardRestaurant = async (req: Request , res: Response) => {
    try {
        const { subDomain, domain, restaurantName, address, menu} = req.body as IRestaurant;
        // const user = req.user._id;
        const restaurant = new Restaurant({
            // user,
            subDomain,
            domain,
            restaurantName,
            address,
            menu
        });
        await restaurant.save();
        return res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
}