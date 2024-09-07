import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';
import { IRestaurant } from '../models/restaurantModel';

export const onBoardRestaurant = async (req: Request , res: Response) => {
    try {
        const { user, subDomain, domain, restaurantName, address, menu} = req.body as IRestaurant;
        // const user = req.user._id;
        const restaurant = new Restaurant({
            user,
            subDomain,
            domain,
            restaurantName,
            address,
            menu,
        });
        await restaurant.save();
        return res.status(201).send({
            restaurant,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}

export const getRestaurant = async (req: Request , res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        // TODO: check if user is authorized to view this restaurant
        const restaurant = await Restaurant
            .findById(id)
            .populate('user', 'email');
        if (!restaurant) {
            return res.status(404).send({message: 'Restaurant not found'});
        }
        return res.status(200).send({
            restaurant,
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}

export const updateRestaurant = async (req: Request , res: Response) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
        if (!restaurant) {
            return res.status(404).send({message: 'Restaurant not found'});
        }   
        await restaurant.save();
        return res.status(200).send({
            restaurant,
            success: true,
        });
    } catch (error) {
        res.status(400).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}