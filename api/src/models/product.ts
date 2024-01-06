import mongoose , { Schema, Document } from "mongoose";

import slug from 'mongoose-slug-updater';
import { ICategory } from "./category";
import {ISubCategory} from "./subcategory";
import {IBrand} from "./brand";

mongoose.plugin(slug);

const productSchema=new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        index:true,
    },
    slug:{
        type:String,
        slug:"name",
        unique:true,
        index:true,
    },
    summary:{
        type:String,
        required:false,
        maxLength:250,
    },
    description:String,
    price:{
        type:Number,
        default:0.0,
    },
    discount:{
        type:Number,
        default:0.0,
    },
    priceAfterDiscount:{
        type:Number,
        default:0.0,
    },
    images:Array,
    thumbnailImage:{
        type:String,
        required:true,
    },
    category:{
        type:Schema.Types.ObjectId,
    ref:"Category"},
    subcategory:{
        type:Schema.Types.ObjectId,
        ref:"SubCategory",
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
    },
    quantity:{
        type:Number,
        default:10,
    },
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"active",
    }

},{timestamps: true})


export interface IProduct extends Document{
    name:string;
    summary:string;
    description?:string;
    images?:Array<string>;
    thumbnailImage:string | null;
    slug?:string;
    price:number;
    discount:number;
    priceAfterDiscount?:number;
    category:ICategory["_id"];
    subcategory:ISubCategory["_id"];
    brand:IBrand["_id"];
    quantity:number;
    status?:string;
}

const Product=mongoose.model<IProduct>("Product",productSchema);

export default Product;