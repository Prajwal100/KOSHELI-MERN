import {Request, Response} from 'express';
import Brand from '../../models/brand'
import { unlinkFile } from '../../utils/file';

const getBrands= async (req: Request, res: Response): Promise<void>=>{
    try{
        const brand=await Brand.find().sort({"_id":-1});
        
        res.status(200).json({
            status:true,message:"Successfully fetched brand.",data:brand
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({status:false,message:"Something went wrong while fetching brand."});
    }
}

const addBrand= async (req: Request, res: Response): Promise<void>=>{
    try{
        const {name,logo,status}= req.body;
        const brand=await Brand.create({name,logo,status});
        
        res.status(201).json({
            status:true,message:"Brand successfully created.",data: brand
        })
    }
    catch(error){
        if(error.message && error.message.includes("duplicate key error collection")){
            res.status(409).json({status:false,message:"Brand with duplicate key name."})
        }
    }
}

const updateBrand= async (req: Request, res: Response): Promise<void>=>{
    try{
        const {name,logo,status}=req.body;
        const brand=await Brand.findByIdAndUpdate(req.params.id,{name,logo,status},{new:true})
        
        res.status(200).json({status:true,message:"Brand successfully updated.",data:brand})
    }
    catch(error){
        console.log(error);
        res.status(400).json({status:false,message:"Something went wrong while updating the brand."})
    }
}

const deleteBrand= async (req: Request, res: Response): Promise<any>=>{
    try{
        const brand= await Brand.findByIdAndDelete(req.params.id);
        if(brand){
           try{
            const filePath=brand.logo.substring(1);
            unlinkFile(filePath);
           }
           catch(error){
            console.error(error);
           }
           return res.status(200).json({status:true,data:brand,message:"Successfully delete brand."})
        }
        else{
            return res.status(404).json({status:false,message:'Brand not found'});
        }
        
    }
    catch(error){
        console.error(error);
        return res.status(400).json({status:false,message:"Something went wrong while deleting brand."})
    }
}


export ={
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand,
}