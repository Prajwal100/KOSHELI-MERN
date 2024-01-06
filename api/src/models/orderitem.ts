import mongoose, { Schema, Document } from "mongoose";
import {IProduct} from './product'

export const OrderItemSchema=new Schema({
    name:String,
    description:String,
    image:String,
    product:{type:Schema.Types.ObjectId,ref:"Product"},
    quantity:Number,
    price:Number
},{timestamps: true})


export interface IOrderItem extends Document{
    name:string;
    description:string;
    image:string;
    product:IProduct["_id"];
    quantity:number;
    price:number;
}

const OrderItem=mongoose.model<IOrderItem>("OrderItem",OrderItemSchema);
export default OrderItem;