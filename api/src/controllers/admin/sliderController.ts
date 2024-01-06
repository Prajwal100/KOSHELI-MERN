import Slider from "../../models/slider";
import { Request, Response } from "express";
import { unlinkFile } from "../../utils/file";
const getAllSliders = async (req: Request, res: Response): Promise<void> => {
  try {
    const sliders = await Slider.find({}).sort({"_id":-1});
    res.status(200).send({
      status: true,
      data: sliders,
      message: "Successfully retrieved all sliders.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on slider.",
    });
  }
};

const addSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, link, image, status } = req.body;
    const slider = await Slider.create({
      name,
      description,
      link,
      image,
      status,
    });

    res.status(201).json({
      status: true,
      data: slider,
      message: "Slider successfully added.",
    });
  } catch (error) {
    if (
      error.message &&
      error.message.includes("duplicate key error collection")
    ) {
      res.status(409).json({
        status: false,
        message: "Slider with given name already exists.",
      });
      return;
    }
    res.status(400).send({
      status: false,
      message: "Something went wrong with the slider.",
    });
  }
};

const updateSlider= async (req: Request, res: Response): Promise<void> => {
    try{
        const {name,description,link,image,status}=req.body;
        const slider =await Slider.findByIdAndUpdate(
            req.params.id,{name,description,link,image,status},{new:true}
        );
        res.status(200).json({status:true,data:slider,message:"Slider updated successfully."})
    }
    catch(error){
        res.status(400).json({status:false,message:error.message});
    }
}

const deleteSlider= async (req: Request, res: Response): Promise<any> => {
    try{
        const slider =await Slider.findByIdAndDelete(req.params.id);
        if(slider){
            try{
                if(slider.image){
                    const filePath=slider.image.substring(1);
                    unlinkFile(filePath);
                }
            }
            catch(error){
                console.error(error);
            }
            return res.status(200).json({status:true,data:slider,message:"Slider deleted successfully."});
        }
        else{
            return res.status(404).send({status:false,message:"Slider not found."});
        }
        
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:false,message:"Something went wrong."});
    }
}

export = {
  getAllSliders,
  addSlider,
  updateSlider,
  deleteSlider
};
