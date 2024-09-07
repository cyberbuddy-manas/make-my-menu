// User Model
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

interface IUser {
    email: string;
    phoneNumber: number;
    isOnHold: boolean;
  }

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    // isOnHold is used to stop the user from logging in
    isOnHold: { type: Boolean, default: false },
    // Saving the token in DB for SSO
    token: { type: String },
    // reset password token for reset password
    resetPasswordToken: {
        otp: { type: String },
        expires: { type: Date }
    },
    lastLogin: { type: Date }
},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    next();
});

const User = model<IUser>('User', userSchema);

export default User;