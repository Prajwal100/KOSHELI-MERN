import {Request, Response} from 'express'
import Settings from '../../models/settings';

const getSettings= async (req: Request, res: Response): Promise<void> => {
    try{
        const settings = await Settings.findOne();
        if(settings){
            res.status(200).json({
                status:true,message:'Successfully fetched.',data:settings
            })
        }
        else{
            res.status(404).json({
                status:false,message:'Settings not found.'
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:false,message:"Something went wrong."
        })
    }
}

 const updateSettings =async (req: Request, res: Response): Promise<void>=>{
    try{
        const {site_name, site_description,site_keywords,email,phone,address,logo,favicon,copyright,symbol,facebookUrl,instagramUrl,twitterUrl,linkedinUrl}=req.body;
        const settings=await Settings.findByIdAndUpdate(req.params.id,{site_name, site_description,site_keywords,email,phone,address,logo,favicon,copyright,symbol,facebookUrl,instagramUrl,twitterUrl,linkedinUrl},{new:true})
        
        res.status(200).json({
            status:true,message:"Successfully updated settings.",data:settings
        })
    }
    catch(e){
        res.status(400).json({
            status:false,message:e.message
        })
    }
}

export ={
    getSettings,
    updateSettings
}