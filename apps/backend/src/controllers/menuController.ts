import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';
import { IRestaurant } from '../models/restaurantModel';

export const getMenu = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
        });
    }
}
