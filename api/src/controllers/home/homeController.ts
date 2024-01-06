
import {Request, Response} from 'express';
import Brand from '../../models/brand';
import Category from '../../models/category';
import Product from '../../models/product';
import Settings from '../../models/settings';
import Slider from '../../models/slider';
const getSliders= async(req: Request, res: Response): Promise<void>=>{
    try{
        const sliders=await Slider.find({'status':"active"}).sort({"_id":-1});
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
}

const getCategories= async(req: Request, res: Response): Promise<void>=>{
    try{
        const categories=await Category.find({'status':"active"}).sort({"_id":-1});
        res.status(200).send({
            status: true,
            data: categories,
            message: "Successfully retrieved all categories.",
          });
        } catch (error) {
          res.status(400).send({
            status: false,
            message: "Something went wrong on categories.",
          });
        }
}

const getCategoryByID= async(req: Request, res: Response): Promise<void>=>{
  try{
      const category=await Category.findOne({"_id":req.params.id});
      res.status(200).send({
          status: true,
          data: category,
          message: "Successfully retrieved category.",
        });
      } catch (error) {
        res.status(400).send({
          status: false,
          message: "Something went wrong on categories.",
        });
      }
}

const getBrands= async(req: Request, res: Response): Promise<void>=>{
    try{
        const brands=await Brand.find({'status':"active"}).sort({"_id":-1});
        res.status(200).send({
            status: true,
            data: brands,
            message: "Successfully retrieved all brands.",
          });
        } catch (error) {
          res.status(400).send({
            status: false,
            message: "Something went wrong on brands.",
          });
        }
}

const getTopProducts= async(req: Request, res: Response): Promise<void>=>{
    try{
        const topProducts=await Product.find({'status':"active"}).sort({"_id":-1});
        res.status(200).send({
            status: true,
            data: topProducts,
            message: "Successfully retrieved all products.",
          });
        } catch (error) {
          res.status(400).send({
            status: false,
            message: "Something went wrong on products.",
          });
        }
}

// Get Products by CategoryID
const getProductsByCatId= async (req: Request, res: Response): Promise<void> => {
  try{
    const products= await Product.find({"status":"active","category":req.params.id}).sort({"id":-1}).populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("brand", "_id name")
    .lean();
    res.status(200).json({
      status:true,message:"successfully fetched the products based on category",data:products
    })
  }
  catch(e){
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
    });
  }
}

const generalSettings= async(req: Request, res: Response): Promise<void>=>{
    try{
        const settings=await Settings.findOne();
        res.status(200).send({
            status: true,
            data: settings,
            message: "Successfully retrieved all settings.",
          });
        } catch (error) {
          res.status(400).send({
            status: false,
            message: "Something went wrong on settings.",
          });
        }
}

const getProductDetails = async(req: Request, res: Response): Promise<void>=>{
  try{
    
    let product=await Product.findOne({ _id:req.params.id})
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("brand", "_id name")
    .lean();
    res.status(200).send({
      status: true,
      data: product,
      message: "Successfully fetched product.",
    });
  }
  catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong.",
    });
  }
}

export ={
    getSliders,
    getCategories,
    getCategoryByID,
    getBrands,
    generalSettings,
    getTopProducts,
    getProductDetails,
  getProductsByCatId,
    
}