import {Router,Request} from 'express';
import multer from 'multer'; 
import fs from 'fs';
import path from 'path';
import uploadController from '../../../controllers/uploadController';
const router = Router();
import {nameChanger} from '../../../utils/helper'
const storage = (uploadPath: string) => {
    return multer.diskStorage({
      destination(req, file, cb) {
        try {
          const upload_folder = `uploads/${uploadPath}`;
          if (!fs.existsSync(upload_folder)) {
            fs.mkdirSync(upload_folder, { recursive: true });
          }
        } catch (error) {
          console.error(error);
          cb(new Error("Error with storage"), `uploads/${uploadPath}`);
        }
        cb(null, `uploads/${uploadPath}`);
      },
      filename(req, file, cb) {
        cb(
          null,
          `${file.fieldname}-${Date.now()}-${nameChanger(file.originalname)}`
        );
      },
    });
  };

interface IError extends Error{
    status?:number;
}
const fileFilter=(req:Request,file:Express.Multer.File,cb:CallableFunction)=>{
    const filetypes=/jpg|jpeg|png|svg|ico/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);
    
    if(extname && mimetype) {
        return cb(null,true);
    }
    else{
        const error:IError =new Error("Image only.");
        error.status=409;
        cb(error);
    }
}


router.post(
  "/slider/image/upload",
  multer({
    storage: storage("slider/"),
    fileFilter: fileFilter,
  }).single("image"),
  uploadController.uploadImage
);

router.post(
  "/category/image/upload",
  multer({
    storage: storage("category/"),
    fileFilter: fileFilter,
  }).single("image"),uploadController.uploadImageResize
)

router.post(
  "/subcategory/image/upload",
  multer({
    storage: storage("subcategory/image"),
    fileFilter: fileFilter,
  }).single("image"),uploadController.uploadImageResize
)

router.post("/brand/image/upload",multer({
  storage: storage("brand/image"),
  fileFilter: fileFilter,
}).single("image"),uploadController.uploadImageResize)

router.post("/product/thumbnail_image/upload",multer({
  storage: storage("product/image"),
  fileFilter: fileFilter,
}).single("thumbnail_image"),uploadController.uploadImageResize)

router.post("/product/image/upload",multer({
  storage: storage("product/image"),
  fileFilter: fileFilter,
}).array("image",5),uploadController.uploadMultiImageResize)


router.post("/settings/logo/upload",multer({
  storage: storage("settings/image"),
  fileFilter: fileFilter,
}).single("logo"),uploadController.uploadImage)

router.post("/settings/favicon/upload",multer({
  storage: storage("settings/image"),
  fileFilter: fileFilter,
}).single("favicon"),uploadController.uploadImage)
export default router;