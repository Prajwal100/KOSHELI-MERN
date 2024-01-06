import mongoose, { Schema, Document} from 'mongoose';

import slug from 'mongoose-slug-updater'

import {IProduct} from './product'

mongoose.plugin(slug);

const brandSchema=new Schema({
    name:{
        type:String,
        unique:true,
        index:true,
        required:true,
    },
    slug:{
        type:String,
        slug:"name",
        unique:true,
        index:true,
    },
    logo:String,
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"active",
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
},{timestamps: true})


export interface IBrand extends Document{
    name:string;
    logo?:string;
    status:string;
    products:[IProduct["_id"]];
}

const Brand=mongoose.model<IBrand>("Brand",brandSchema);

export default Brand;