import {Schema, model} from 'mongoose';

export interface IRestaurant {
    _id: string;
    user: string;
    subDomain: string;
    // domain: string;
    restaurantName: string;
    address: string;
    menu: object;
    activeTemplate: string;
}

// Example menu object
// {
//   "starters": [
//     {
//       "name": "Bruschetta",
//       "price": 5.99,
//       "description": "Grilled bread with tomato and basil"
//     },
//   ],
//   "mains": [
//     {
//       "name": "Spaghetti Carbonara",
//       "price": 12.99,
//       "description": "Pasta with pancetta and creamy sauce"
//     },
//   ]
// }

const restaurantSchema = new Schema({
  // TODO: make user required
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  subDomain: { type: String, required: true, unique: true },
  // custom domain is to be added in the future
  // domain: { type: String, unique: true },
  restaurantName: { type: String},
  address: {type: String},
  // TODO: define the menu schema
  menu: { type: Object },
  // template Name is an already created template
  activeTemplate: { type: String },   
  isActive: { type: Boolean, default: true },
},
{ timestamps: true}
);


const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
