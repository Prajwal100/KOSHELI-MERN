import {Request, Response} from 'express';
import Category from '../../models/category'
import { unlinkFile } from '../../utils/file';
const getCategories = async (req: Request, res: Response): Promise<void> => {
    try{
        const categories=await Category.find({}).sort({'_id':-1})
        .populate("subcategory","_id name").lean();
        res.status(200).json({
            status:true,
            message:"Category successfully retrieved.",
            data:categories
        })
    }
    catch(error){
        console.error(error);
        res.status(400).send({
            status:false,
            message:"Something went wrong!"
        })
    }
}

const addCategory= async (req: Request, res: Response): Promise<void>=>{
    try{
       const {name,description,image,status}=req.body; 
       const category=await Category.create({name,description,image,status})
       res.status(201).json({
        status:true,data:category,message:"Category successfully created."
       })
    }
    catch(error){
        if(error.message && error.message.includes("duplicate key error collection")){
            res.status(409).json({message:"Category with duplicate name.",status:false})
            return;
        }
        
        console.error(error.message);
        res.status(400).json({
            status:false,
            message:"Error occurred while creating category."
        })
    }
}

const updateCategory= async (req: Request, res: Response): Promise<void>=>{
    try{
        const {name,description,image,status}= req.body;
        const category=await Category.findByIdAndUpdate(req.params.id,{
            name,description,image,status
        },{new:true,upsert:true});
        
        res.status(200).json({
            status:true,message:"Category successfully updated.",data:category
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:false,message:"Something went wrong while updating category."})
    }
}

const deleteCategory= async (req: Request, res: Response): Promise<any>=>{
    try{
        const category=await Category.findByIdAndDelete(req.params.id);
        if(category){
            try{
                if(category.image){
                    const filePath=category.image.substring(1);
                    unlinkFile(filePath);
                }
            }
            catch(error){
                console.error(error);
            }
            
            return res.status(200).json({status:true, data:category,message:"Category successfully deleted."})
        }
        else{
            return res.status(404).json({status:false,message:"Category not found"})
        }
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:false,message:"Something went wrong while deleting category."})
    }
}

export ={
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}