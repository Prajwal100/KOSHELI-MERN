import mongoose, { Schema, Document } from "mongoose";

const SliderSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    maxLength: [100, "Max length of characters should be 100 characters."],
  },
  image: { type: String, required: true },
  link: String,
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active",
  }
},{timestamps:true});

export interface ISlider extends Document{
    name?:string;
    description?:string;
    image:string;
    link?:string;
    status:string;
}

const Slider=mongoose.model<ISlider>("Slider",SliderSchema);

export default Slider;
