import mongoose ,{Schema, Document} from "mongoose";
import validator from "validator";
const settingsSchema=new Schema({
    site_name:{
        type:String,
        unique:true,
        required:true,
    },
    site_keywords:String,
    site_description:String,
    logo:{
        type:String,
        required:true,
    },
    favicon:String,
    email:{
        type:String,
        validate:[validator.isEmail,'Enter the valid email address.']
    },
    phone:String,
    address:String,
    symbol:{
        type:String,
        default:'$'
    },
    copyright:String,
    facebookUrl:String,
    instagramUrl:String,
    linkedinUrl:String,
    twitterUrl:String,
    visitors:{
        type:Number,
        default:0,
    },
})

export interface ISettings extends Document{
    site_name:string,
    site_keywords?:string,
    site_description?:string,
    logo:string,
    favicon?:string,
    email?:string,
    phone?:string,
    address?:string,
    symbol?:string,
    copyright?:string,
    facebookUrl?:string,
    instagramUrl?:string,
    twitterUrl?:string,
    linkedinUrl?:string,
    visitors?:number,
}

const settings=mongoose.model<ISettings>("Settings",settingsSchema)

export default settings;