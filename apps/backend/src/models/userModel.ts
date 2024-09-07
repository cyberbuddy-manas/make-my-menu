// User Model
import { Schema, model } from 'mongoose';

interface IUser {
    email: string;
    phoneNumber: number;
    isOnHold: boolean;
    authToken: {
        token: string;
        expires: Date;
    };
    loginToken: {
        otp: string;
        expires: Date;
    };
  }

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    // isOnHold is used to stop the user from logging in
    isOnHold: { type: Boolean, default: false },
    // Saving the token in DB for SSO
    authToken: { 
        token: { type: String },
        expires: { type: Date },
      },
    // reset password token for reset password
    loginToken: {
        otp: { type: String },
        expires: { type: Date }
    },
    lastLogin: { type: Date }
},
    { timestamps: true }
);


const User = model<IUser>('User', userSchema);

export default User;