import mongoose, { Schema, Document } from "mongoose";
import { OrderItemSchema } from "./orderitem";
import {IOrderItem} from "./orderitem";
import {IUser} from './user'
const orderSchema=new Schema({
    orderID:{
        type:String,
        unique:true,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    orderItems:[OrderItemSchema],
    shippingAddress:{
        country:String,
        address:String,
        phone:String,
        postalCode:String,
        name:String,       
    },
    paymentMethod:{
        type:String,
        enum:["cod","esewa","paypal","stripe"],
        default:"cod"
    },
    orderStatus:{
        type:String,
        enum:["pending","processing","delivered","cancelled"],
        default:"pending",
    },
    paymentStatus:{
        type:String,
        enum:["paid","unpaid","failed"],
        default:"unpaid",
    },
    paidAt:Date,
    discount:{
        type:Number,
        required:false,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    orderPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    note:String
},{timestamps: true})

export interface IOrder extends Document{
    orderID:string;
    user:IUser["_id"];
    orderItems:IOrderItem[];
    shippingAddress:{
        country?:string;
        address?:string;
        phone?:string;
        postalCode?:string;
        name?:string;
    };
    paymentMethod?:string;
    orderStatus?:string;
    paymentStatus?: string;
    paidAt?: Date;
    discount?:number;
    orderPrice?:number;
    shippingPrice?:number;
    taxPrice?:number;
    totalPrice?:number;
    note?:string;
    createdAt?: Date;
  updatedAt?: Date;
}

const Order=mongoose.model<IOrder>("Order",orderSchema);

export default Order;