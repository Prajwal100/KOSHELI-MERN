import {Request, Response} from 'express';
import User from '../../models/user'
import { unlinkFile } from '../../utils/file';

const getUsers= async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find({
            role: 'user',
        }).select("-password").sort({"_id":-1}).populate('order',"_id");
        res.status(200).json({
            status:true,message:"Successfully fetched users.",data:users
        })
    }
    catch(err){
        res.status(400).json({status:false,message:"Error fetching users"})
    }
}

const updateUser= async (req: Request, res: Response): Promise<void> => {
    try{
        const {role,status}= req.body;
        
        const user=await User.findByIdAndUpdate(req.params.id,{role,status},{new:true});
        
        res.status(200).json({status:true,message:"Successfully updated user",data:user})
    }
    catch(error){
        res.status(400).json({status:false,message:'Error updating users'})
    }
}

const deleteUser= async (req: Request, res: Response): Promise<any> => {
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        if(user){
            try{
                if(user.avatar){
                    const filePath=user.avatar.substring(1);
                    unlinkFile(filePath);
                }
            }
            catch(err){
                console.log(err);
            }
            return res.status(200).json({status:true,data:user,message:"User deleted successfully."});
            
        }
        else{
            return res.status(404).json({
                status:false,message:"User not found",
            })
        }
    }
    catch(err){
        return res.status(400).json({
            status:false,message:"Something went wrong while deleting."
        })
    }
}

export ={
    getUsers,
    updateUser,
    deleteUser,
}