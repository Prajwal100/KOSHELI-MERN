import { Document, Schema, model } from "mongoose";
import validator from "validator";
import {IProduct} from '../models/product'
import {IOrder} from '../models/order'
import { IShippingAddress } from "./shipping_address";
const CartItemSchema = new Schema({
  product:{
    type:Schema.Types.ObjectId,
    ref:"Product"
  },
  quantity:Number,
  priceAfterDiscount:Number,
});


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name."],
    },
    phone: String,
    avatar: String,
    address: String,
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Email is required."],
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [6, "Please enter at least 6 characters"],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    cart:[CartItemSchema],
    order:[{
      type:Schema.Types.ObjectId,
      ref:"Order"
    }],
    shipping_address:[{
      type:Schema.Types.ObjectId,
      ref:"ShippingAddress"
    }],
    facebookID: {
      type: String,
      select: false,
    },
    googleID: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "banned"],
    },
    socialLogin: {
      type: Boolean,
      default: false,
    },
    lastLoggedIn: Date,
  },
  { timestamps: true }
);

export interface IUser extends Document {
  name: string;
  phone?: string;
  avatar?: string;
  address?: string;
  email: string;
  password?: string;
  emailVerified?: boolean;
  cart?:ICartItem[];
  order?:IOrder[];
  shipping_address?:IShippingAddress["_id"][];
  facebookID?: string;
  googleID?: string;
  role?: string;
  status?: string;
  socialLogin?: boolean;
  lastLoggedIn?: Date;
}
export interface ICartItem extends Document{
  product : IProduct["_id"];
  quantity :number;
  priceAfterDiscount:number;
}

const User = model<IUser>("User", UserSchema);

export const Cart=model<ICartItem>("CartItem",CartItemSchema)

export default User;
