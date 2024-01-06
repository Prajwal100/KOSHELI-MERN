import mongoose, { Schema, Document } from "mongoose";
import {ICategory} from './category'
import {IProduct} from './product'
import slug from 'mongoose-slug-updater'
mongoose.plugin(slug);

const subCategorySchema=new Schema({
    name:{
        type:String,
        unique:true,
        index:true,
        required:true,
    },
    slug:{
        type:String,
        slug:"name",
        index:true,
        unique:true,
    },
    description:String,
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    status:{
        type:String,
        enum:["active", "inactive"],
        default: "active",
    }
},{timestamps: true})

export interface ISubCategory extends Document{
    name:string,
    description?:string,
    category:ICategory["_id"],
    products:[IProduct["_id"]],
    status:string,
}

const SubCategory=mongoose.model<ISubCategory>("SubCategory",subCategorySchema);

export default SubCategory;