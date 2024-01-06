import mongoose,{ Schema, Document} from "mongoose";
import {ISubCategory} from './subcategory'
import {IProduct} from './product'
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug);

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    slug:{
        type:String,
        slug:"name",
        unique:true,
        index:true,
    },
    description:String,
    image:String,
    subcategory:[
        {
            type:Schema.Types.ObjectId,
            ref:"SubCategory",
        }
    ],
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product",
        }
    ],
    status:{
        type:String,
        enum:["active", "inactive"],
        default: "active",
    }
},{timestamps: true})


export interface ICategory extends Document{
    name:string;
    description?:string;
    image?:string;
    subcategory:[ISubCategory["_id"]];
    products:[IProduct["_id"]];
    status:string;
}

const Category=mongoose.model<ICategory>("Category",categorySchema);
export default Category;