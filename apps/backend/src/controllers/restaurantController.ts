import Restaurant from "../models/restaurantModel";
import { Request, Response } from 'express';
import { IRestaurant } from '../models/restaurantModel';
import {scrapeMenu} from '../services/zomatoScrapper';
import { menuToJsonAI } from "../services/geminiAI";

export const onBoardRestaurant = async (req: Request , res: Response) => {
    try {
        const { user, subDomain, restaurantName, address, menu} = req.body as IRestaurant;
        // const user = req.user._id;
        const restaurant = new Restaurant({
            user,
            subDomain,
            // domain,
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

export const deleteRestaurant = async (req: Request , res: Response) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).send({message: 'Restaurant not found'});
        }
        return res.status(200).send({
            message: 'Restaurant deleted successfully',
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

export const getMyRestaurants = async (req: Request , res: Response) => {
    try {
        const { user } = req.body;
        const restaurants = await Restaurant.find({user});
        return res.status(200).send({
            restaurants,
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

const alreadyScrapedData = [
            {
                "name": "Cream Of Mushroom Soup",
                "price": "₹170"
            },
            {
                "name": "Cream Of Tomato Soup",
                "price": "₹160"
            },
            {
                "name": "Eatasia Chef's Special Soup",
                "price": "₹235"
            },
            {
                "name": "Eatasia Special Thai Noodles Soup",
                "price": "₹235"
            },
            {
                "name": "Hot And Sour Soup",
                "price": "₹185"
            },
            {
                "name": "Mushroom Soup",
                "price": "₹185"
            },
            {
                "name": "Spicy And Sour Soup",
                "price": "₹205"
            },
            {
                "name": "Sweet Corn Soup",
                "price": "₹160"
            },
            {
                "name": "Veg Manchow Soup",
                "price": "₹195"
            },
            {
                "name": "Vegetable Noodles Soup",
                "price": "₹185"
            },
            {
                "name": "Fresh Green Salad",
                "price": "₹175"
            },
            {
                "name": "Kachumber Salad",
                "price": "₹130"
            },
            {
                "name": "Russian Salad",
                "price": "₹235"
            },
            {
                "name": "Fruit Raita",
                "price": "₹185"
            },
            {
                "name": "Pine Apple Raita",
                "price": "₹185"
            },
            {
                "name": "Raita",
                "price": "₹175"
            },
            {
                "name": "Cheese Corn Ball",
                "price": "₹335"
            },
            {
                "name": "Cheese Corn Roll",
                "price": "₹355"
            },
            {
                "name": "Crispy Corn Salt And Pepper",
                "price": "₹335"
            },
            {
                "name": "Dice Cheese Schezwan Pepper",
                "price": "₹335"
            },
            {
                "name": "Paneer 65",
                "price": "₹345"
            },
            {
                "name": "Paneer Chilly",
                "price": "₹335"
            },
            {
                "name": "Paneer Schezwan Chilly",
                "price": "₹335"
            },
            {
                "name": "Paneer Schezwan Stick",
                "price": "₹345"
            },
            {
                "name": "Singapore Broccoli",
                "price": "₹365"
            },
            {
                "name": "Spicy Corn Salad",
                "price": "₹315"
            },
            {
                "name": "Veg Cigar",
                "price": "₹365"
            },
            {
                "name": "Veg Tong Tong",
                "price": "₹365"
            },
            {
                "name": "Baby Corn Mushroom Chilly",
                "price": "₹320"
            },
            {
                "name": "Cauliflower Manchurian Gravy",
                "price": "₹295"
            },
            {
                "name": "Cauliflower Manchurian Dry",
                "price": "₹295"
            },
            {
                "name": "Crispy Honey Potato Chilly",
                "price": "₹295"
            },
            {
                "name": "Fried Vegetables",
                "price": "₹280"
            },
            {
                "name": "Hot Garlic Gobi Chilly Dry",
                "price": "₹290"
            },
            {
                "name": "Mushroom Duplex",
                "price": "₹295"
            },
            {
                "name": "Veg Crispy In Hot Sauce",
                "price": "₹295"
            },
            {
                "name": "Veg Lollipop",
                "price": "₹295"
            },
            {
                "name": "Veg Manchurian Gravy",
                "price": "₹295"
            },
            {
                "name": "Veg Manchurian Dry",
                "price": "₹320"
            },
            {
                "name": "Veg Spring Roll",
                "price": "₹260"
            },
            {
                "name": "Dagshai Platter",
                "price": "₹575"
            },
            {
                "name": "Makki Malai Seekh Kebab",
                "price": "₹395"
            },
            {
                "name": "Mushroom Achari Tikka",
                "price": "₹365"
            },
            {
                "name": "Mushroom Malai Tikka",
                "price": "₹320"
            },
            {
                "name": "Mushroom Stuffed Tikka",
                "price": "₹310"
            },
            {
                "name": "Mushroom Tikka",
                "price": "₹365"
            },
            {
                "name": "Paneer Hariyali Tikka",
                "price": "₹365"
            },
            {
                "name": "Paneer Irani Tikka",
                "price": "₹365"
            },
            {
                "name": "Paneer Malai Tikka",
                "price": "₹395"
            },
            {
                "name": "Paneer Tikka",
                "price": "₹365"
            },
            {
                "name": "Shakahari Kebab",
                "price": "₹370"
            },
            {
                "name": "Stuffed Tandoori Aloo",
                "price": "₹325"
            },
            {
                "name": "Plain Tandoori Aloo Tikka",
                "price": "₹295"
            },
            {
                "name": "Veg Seekh Kebab",
                "price": "₹315"
            },
            {
                "name": "Cheese Malai Kofta",
                "price": "₹365"
            },
            {
                "name": "Cheese Tomato",
                "price": "₹375"
            },
            {
                "name": "Corn Capsicum Masala",
                "price": "₹375"
            },
            {
                "name": "Corn Masala",
                "price": "₹365"
            },
            {
                "name": "Amritsari Dal",
                "price": "₹295"
            },
            {
                "name": "Dal Makhani",
                "price": "₹305"
            },
            {
                "name": "Yellow Dal",
                "price": "₹295"
            },
            {
                "name": "Dal Kabila Smoked",
                "price": "₹310"
            },
            {
                "name": "Dum Aloo Kashmiri",
                "price": "₹315"
            },
            {
                "name": "Gobhi Adarki",
                "price": "₹305"
            },
            {
                "name": "Gobhi Masala",
                "price": "₹305"
            },
            {
                "name": "Jeera Aloo",
                "price": "₹305"
            },
            {
                "name": "Mixed Veg",
                "price": "₹345"
            },
            {
                "name": "Mushroom Do Pyaza",
                "price": "₹365"
            },
            {
                "name": "Mushroom Latpata",
                "price": "₹365"
            },
            {
                "name": "Mushroom Masala",
                "price": "₹365"
            },
            {
                "name": "Matar Paneer",
                "price": "₹365"
            },
            {
                "name": "Palak Corn",
                "price": "₹375"
            },
            {
                "name": "Palak Paneer",
                "price": "₹365"
            },
            {
                "name": "Kadhai Paneer",
                "price": "₹375"
            },
            {
                "name": "Paneer Kasturi Methi",
                "price": "₹375"
            },
            {
                "name": "Paneer Lababdar",
                "price": "₹375"
            },
            {
                "name": "Paneer Makhani",
                "price": "₹375"
            },
            {
                "name": "Paneer Pasanda",
                "price": "₹385"
            },
            {
                "name": "Paneer Tikka Butter Masala",
                "price": "₹395"
            },
            {
                "name": "Shahi Paneer",
                "price": "₹375"
            },
            {
                "name": "Veg Jalfrezi",
                "price": "₹305"
            },
            {
                "name": "Veg Kofta Curry",
                "price": "₹345"
            },
            {
                "name": "Butter Naan",
                "price": "₹75"
            },
            {
                "name": "Garlic Naan",
                "price": "₹85"
            },
            {
                "name": "Kashmiri Naan",
                "price": "₹105"
            },
            {
                "name": "Kasturi Naan",
                "price": "₹65"
            },
            {
                "name": "Khasta Roti",
                "price": "₹55"
            },
            {
                "name": "Laccha Paratha",
                "price": "₹65"
            },
            {
                "name": "Mattar Wala Parantha (Tawa)",
                "price": "₹85"
            },
            {
                "name": "Methi Parantha",
                "price": "₹65"
            },
            {
                "name": "Missi Roti",
                "price": "₹65"
            },
            {
                "name": "Paneer Naan With Gravy",
                "price": "₹235"
            },
            {
                "name": "Plain Naan",
                "price": "₹55"
            },
            {
                "name": "Pudina Parantha",
                "price": "₹65"
            },
            {
                "name": "Rogani Naan",
                "price": "₹65"
            },
            {
                "name": "Stuffed Paneer Kulcha",
                "price": "₹105"
            },
            {
                "name": "1 Aloo Stuffed Naan With Gravy",
                "price": "₹215"
            },
            {
                "name": "Aloo Stuffed Parantha",
                "price": "₹85"
            },
            {
                "name": "Onion Stuffed Paratha",
                "price": "₹85"
            },
            {
                "name": "Tandoori Butter Roti",
                "price": "₹40"
            },
            {
                "name": "Tandoori Roti",
                "price": "₹35"
            },
            {
                "name": "Hyderabadi Biryani",
                "price": "₹310"
            },
            {
                "name": "Jeera Rice",
                "price": "₹230"
            },
            {
                "name": "Kashmiri Biryani",
                "price": "₹360"
            },
            {
                "name": "Kashmiri Pulao",
                "price": "₹300"
            },
            {
                "name": "Peas Pulao",
                "price": "₹240"
            },
            {
                "name": "Steamed Rice",
                "price": "₹210"
            },
            {
                "name": "Veg Pulao",
                "price": "₹240"
            },
            {
                "name": "Veg Biryani",
                "price": "₹310"
            },
            {
                "name": "Cheese Mysore Masala Dosa",
                "price": "₹310"
            },
            {
                "name": "Cheese Paneer Cube Dosa",
                "price": "₹310"
            },
            {
                "name": "Cheese Schezwan Pepper Dosa",
                "price": "₹330"
            },
            {
                "name": "Cheese Spring Dosa",
                "price": "₹310"
            },
            {
                "name": "Family Desi Ghee Roasted Dosa",
                "price": "₹550"
            },
            {
                "name": "Luv Kush Dosa",
                "price": "₹310"
            },
            {
                "name": "Paneer Bhurji Dosa",
                "price": "₹320"
            },
            {
                "name": "Paneer Tikka Dosa",
                "price": "₹320"
            },
            {
                "name": "Schezwan Dosa",
                "price": "₹250"
            },
            {
                "name": "Schezwan Masala Dosa",
                "price": "₹260"
            },
            {
                "name": "Schezwan Paneer Dosa",
                "price": "₹300"
            },
            {
                "name": "Spicy Mushroom Dosa",
                "price": "₹320"
            },
            {
                "name": "Spring Dosa",
                "price": "₹260"
            },
            {
                "name": "Rava Masala Dosa",
                "price": "₹210"
            },
            {
                "name": "Rava Mix Veg Dosa",
                "price": "₹260"
            },
            {
                "name": "Rava Onion Dosa",
                "price": "₹270"
            },
            {
                "name": "Rava Onion Masala Dosa",
                "price": "₹280"
            },
            {
                "name": "Plain Rava Dosa",
                "price": "₹240"
            },
            {
                "name": "Beetroot Dosa",
                "price": "₹230"
            },
            {
                "name": "Butter Masala Dosa",
                "price": "₹260"
            },
            {
                "name": "Capsicum Dosa",
                "price": "₹230"
            },
            {
                "name": "Carrot Dosa",
                "price": "₹230"
            },
            {
                "name": "Khara Dosa",
                "price": "₹230"
            },
            {
                "name": "Khara Dosa With Bhajji Toppings",
                "price": "₹230"
            },
            {
                "name": "Masala Dosa",
                "price": "₹240"
            },
            {
                "name": "Mysore Masala Dosa",
                "price": "₹260"
            },
            {
                "name": "Plain Mysore Dosa",
                "price": "₹240"
            },
            {
                "name": "Onion Dosa",
                "price": "₹230"
            },
            {
                "name": "Paper Masala Dosa With Butter",
                "price": "₹290"
            },
            {
                "name": "Paper Plain Dosa With Butter",
                "price": "₹260"
            },
            {
                "name": "Plain Butter Dosa",
                "price": "₹220"
            },
            {
                "name": "Plain Dosa",
                "price": "₹200"
            },
            {
                "name": "Medu Vada",
                "price": "₹140"
            },
            {
                "name": "Plain Idli",
                "price": "₹160"
            },
            {
                "name": "7 In 1 Uttappam Platter",
                "price": "₹220"
            },
            {
                "name": "Corn Uttapam",
                "price": "₹220"
            },
            {
                "name": "Eatasia Special Uttappam",
                "price": "₹440"
            },
            {
                "name": "Masala Uttapam",
                "price": "₹220"
            },
            {
                "name": "Mix Veg Uttappam",
                "price": "₹250"
            },
            {
                "name": "Mysore Uttappam",
                "price": "₹260"
            },
            {
                "name": "Onion Uttappam",
                "price": "₹230"
            },
            {
                "name": "Plain Uttapam",
                "price": "₹210"
            },
            {
                "name": "Tomato Uttappam",
                "price": "₹230"
            },
            {
                "name": "Plain Baby Dosa",
                "price": "₹120"
            },
            {
                "name": "Chocolate Dosa",
                "price": "₹160"
            },
            {
                "name": "Honey Dosa",
                "price": "₹140"
            },
            {
                "name": "Strawberry Dosa",
                "price": "₹170"
            },
            {
                "name": "Eatasia Special Dosa",
                "price": "₹470"
            },
            {
                "name": "Jain Butter Masala Dosa",
                "price": "₹260"
            },
            {
                "name": "Jain Masala Dosa",
                "price": "₹240"
            },
            {
                "name": "Jain Mysore Masala Dosa",
                "price": "₹260"
            },
            {
                "name": "Jain Paper Masala Dosa With Butter",
                "price": "₹290"
            },
            {
                "name": "Jain Paper Plain Dosa With Butter",
                "price": "₹260"
            },
            {
                "name": "Jain Plain Butter Dosa",
                "price": "₹220"
            },
            {
                "name": "Jain Plain Dosa",
                "price": "₹200"
            },
            {
                "name": "Jain Plain Mysore Dosa",
                "price": "₹240"
            },
            {
                "name": "Burnt Garlic Fried Rice",
                "price": "₹290"
            },
            {
                "name": "Mushroom Fried Rice",
                "price": "₹320"
            },
            {
                "name": "Thai Fried Rice",
                "price": "₹290"
            },
            {
                "name": "Veg Fried Rice",
                "price": "₹270"
            },
            {
                "name": "Veg Schezwan Fried Rice",
                "price": "₹290"
            },
            {
                "name": "Veg Triple Schezwan Rice",
                "price": "₹340"
            },
            {
                "name": "American Chopsuey",
                "price": "₹305"
            },
            {
                "name": "Pan Fried Noodles",
                "price": "₹365"
            },
            {
                "name": "Paneer Singapore Noodles",
                "price": "₹305"
            },
            {
                "name": "Shanghai Street Noodles",
                "price": "₹285"
            },
            {
                "name": "Veg Chinese Chopsuey",
                "price": "₹265"
            },
            {
                "name": "Veg Gravy Noodles",
                "price": "₹285"
            },
            {
                "name": "Veg Hakka Noodles",
                "price": "₹285"
            },
            {
                "name": "Veg Red Chilly Garlic Noodles",
                "price": "₹285"
            },
            {
                "name": "Veg Schezwan Noodles",
                "price": "₹265"
            },
            {
                "name": "Penne In Butter Garlic",
                "price": "₹340"
            },
            {
                "name": "Penne In Red Sauce",
                "price": "₹325"
            },
            {
                "name": "Penne With Creamy Mushroom Sauce",
                "price": "₹344"
            },
            {
                "name": "Mumbai Platter",
                "price": "₹355"
            },
            {
                "name": "Cheese Naan With Gravy",
                "price": "₹245"
            },
            {
                "name": "Paneer Naan With Gravy",
                "price": "₹245"
            },
            {
                "name": "Marathi Poha",
                "price": "₹145"
            },
            {
                "name": "Cheese Butter Pav Bhaji",
                "price": "₹195"
            },
            {
                "name": "Mumbai Butter Pav Bhaji",
                "price": "₹175"
            },
            {
                "name": "Pineapple Kesari",
                "price": "₹130"
            },
            {
                "name": "Amul Butter",
                "price": "₹70"
            },
            {
                "name": "Amul Cheese",
                "price": "₹70"
            },
            {
                "name": "Pure Desi Ghee",
                "price": "₹70"
            },
            {
                "name": "South Indian Special Chutney Powder With Desi Ghee",
                "price": "₹90"
            },
            {
                "name": "Eatasia Special Sandwich",
                "price": "₹320"
            },
            {
                "name": "Grilled Cheese Sandwich",
                "price": "₹320"
            },
            {
                "name": "Mix Veg. Grilled Sandwich",
                "price": "₹320"
            },
            {
                "name": "Paneer Chilli Grilled Sandwich",
                "price": "₹320"
            }
        ];

export const getMenuFromZomato = async (req: Request , res: Response) => {
    try {
        const {link} = req.body;
        const data = await scrapeMenu(link);
        return res.status(200).send({
            data,
            success: true,
        });
    } catch (error) {
    // If there is error then send data scraped in past
    
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error,
            alreadyScrapedData,
        });
    }
}

export const getMenuFromImage = async (req: Request , res: Response) => {
    try {
        const {baseImage} = req.body;
        const data = await menuToJsonAI(baseImage);
        return res.status(200).send({
            data,
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