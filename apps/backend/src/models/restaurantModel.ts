import {Schema, model} from 'mongoose';

export interface IRestaurant {
    user: string;
    subDomain: string;
    domain: string;
    restaurantName: string;
    address: string;
    menu: object;
    activeTemplate: string;
}

const restaurantSchema = new Schema({
  // TODO: make user required
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  subDomain: { type: String, required: true },
  // custom domain is to be added in the future
  domain: { type: String, },
  restaurantName: { type: String},
  address: {type: String},
  // TODO: define the menu schema
  // menu: { type: Object, required: true },
  // template Name is an already created template
  activeTemplate: { type: String },   
},
{ timestamps: true}
);


const Restaurant = model<IRestaurant>('IRestaurant', restaurantSchema);

export default Restaurant;
