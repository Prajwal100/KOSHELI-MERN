import {Request, Response,NextFunction} from 'express';
import User,{IUser} from '../models/user'
import jwt from 'jsonwebtoken';
import config from '../config'

interface Decoded extends Object{
    id:string;
}
const verifyToken=async(req: Request, res: Response,next: NextFunction):Promise<void> => {
    try{
        if(req.headers.authorization){
            const userToken=req.headers.authorization.split("Bearer ")[1];
            if(!userToken){
                throw "Token should be Bearer token";
            }
            
            const decoded=jwt.verify(userToken,config.jwt.SECRET,{
                issuer:config.jwt.ISSUER
            });
            
            const user= await User.findById((decoded as Decoded).id).select("-password")
            .populate({
                path: "cart",
                populate: [
                  {
                    path: "product",
                    select:
                      "name description thumbnailImage price slug",
                  },
                ],
              });
            //   .populate("shipping_address");
              
              if(user){
                req.user=user;
              }
              else{
                res.status(401).send({
                    status:false,message:"User not found, Please login again."
                })
                return;
              }
              next();
        }
        else{
            res.status(403).send({status:false,message:"No token provided."});
            return;
        }
    }
    catch(error){
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
          ) {
            res.status(401).send({
              status: false,
              code: error.name,
              message: "Session Expired. Please Login again",
            });
            return;
          }
          console.error(error);
      
          res.status(422).send({ status: false, message: "Please login again." });
    }
}

const hasRole=(roles:string[])=>{
    return (req: Request, res: Response,next: NextFunction):void=>{
        try{
            const user=req.user as IUser;
            console.log(user);
            if(roles.includes(String(user?.role))){
                next();
            }
            else{
                res.status(403).json({status:false,message:"You don't have enough permissions to access."});
                return;
            }
        }
        catch(error){
            res.status(422).send({message:"Please login again."})
        }
    }
}

export ={
    hasRole,
    verifyToken,
}