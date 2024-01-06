import { Request, Response } from "express";

import Product from "../../models/product";
import Category from "../../models/category";
import SubCategory from "../../models/subcategory";
import Brand from "../../models/brand";
import { unlinkFile } from "../../utils/file";

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({"_id":-1})
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .lean();
    res.status(200).json({
      status: true,
      message: "Successfully fetched products.",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
    });
  }
};



const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      summary,
      description,
      images,
      thumbnailImage,
      category,
      subcategory,
      brand,
      price,
      discount,
      status,
      quantity,
    } = req.body;

    // check the category in db
    const dbCategory = await Category.findById(category);
    if (!dbCategory) {
      res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }
    // checking subcategory in db
    if (subcategory) {
      const dbSubCategory = await SubCategory.findById(subcategory);
      if (!dbSubCategory) {
        res.status(404).json({
          status: false,
          message: "Sub Category not found.",
        });
      }
    }

    // checking brands in DB;
    const dbBrand = await Brand.findById(brand);
    if (!dbBrand) {
      res.status(404).json({
        status: false,
        message: "Brand not found.",
      });
    }

    const product = await Product.create({
      name,
      summary,
      description,
      images,
      thumbnailImage,
      category,
      subcategory,
      brand,
      price,
      discount,
      status,
      quantity,
    });

    const cat = await Category.findByIdAndUpdate(category?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    const subCat = await SubCategory.findByIdAndUpdate(subcategory?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    const brd = await Brand.findByIdAndUpdate(brand?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    product.category = cat;
    product.subcategory = subCat;
    product.brand = brd;
    product.priceAfterDiscount = parseFloat(price) - parseFloat(discount ? discount : 0);

    product.save();
    res.status(201).json({
      status: true,
      message: "Product successfully added.",
      data: product,
    });
  } catch (error) {
    if (
      error.message &&
      error.message.includes("duplicate key error collection")
    ) {
      res.status(409).json({
        status: false,
        message: "Product with duplicate key entry.",
      });
    }
    console.error(error);
    res.status(400).json({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      summary,
      description,
      images,
      thumbnailImage,
      category,
      subcategory,
      brand,
      price,
      discount,
      status,
      quantity,
    } = req.body;

    // check the category in db
    const dbCategory = await Category.findById(category?._id);
    if (!dbCategory) {
      res.status(404).json({
        status: false,
        message: "Category not found.",
      });
      return;
    }
    // checking subcategory in db
    if (subcategory) {
      const dbSubCategory = await SubCategory.findById(subcategory?._id);
      if (!dbSubCategory) {
        res.status(404).json({
          status: false,
          message: "Sub Category not found.",
        });
        return;
      }
    }

    // checking brands in DB;
    const dbBrand = await Brand.findById(brand?._id);
    if (!dbBrand) {
      res.status(404).json({
        status: false,
        message: "Brand not found.",
      });
      return;
    }
    const priceAfterDiscount = parseFloat(price) - parseFloat(discount ? discount : 0);
    const preProduct = await Product.findById(req.params.id);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        summary,
        description,
        images,
        thumbnailImage,
        category,
        subcategory,
        brand,
        price,
        priceAfterDiscount,
        discount,
        status,
        quantity,
      },
      { new: true }
    )
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");

    if (!product) {
      res.status(404).json({
        status: false,
        message: "Product not found.",
      });
    }

    if (preProduct?.category !== product?.category._id) {
      await Category.findByIdAndUpdate(preProduct?.category, {
        $pull: {
          products: product._id,
        },
      });

      await Category.findByIdAndUpdate(product?.category._id, {
        $push: {
          products: product._id,
        },
      });
    }

    if(subcategory){
      if (preProduct?.subcategory !== product?.subcategory._id) {
        await SubCategory.findByIdAndUpdate(preProduct?.subcategory, {
          $pull: {
            products: product._id,
          },
        });
  
        await SubCategory.findByIdAndUpdate(product?.subcategory._id, {
          $push: {
            products: product._id,
          },
        });
      }
    }

    if (preProduct?.brand !== product?.brand._id) {
      await Brand.findByIdAndUpdate(preProduct?.brand, {
        $pull: {
          products: product._id,
        },
      });

      await Brand.findByIdAndUpdate(product?.brand._id, {
        $push: {
          products: product._id,
        },
      });
    }

    res
      .status(200)
      .json({
        status: true,
        message: "Product updated successfully.",
        data: product,
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: false,
      message: "Something went wrong while updating product.",
    });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      try {
        if (product.thumbnailImage) {
          const filePath = product.thumbnailImage.substring(1);
          unlinkFile(filePath);
        }

        if (product.images.length > 0) {
          product.images.forEach((image) => {
            if (image) {
              const filePath = image.substring(1);
              unlinkFile(filePath);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }

      await Category.findByIdAndUpdate(product?.category, {
        $pull: {
          products: product._id,
        },
      }).exec();

      await SubCategory.findByIdAndUpdate(product?.subcategory, {
        $pull: {
          products: product._id,
        },
      }).exec();

      await Brand.findByIdAndUpdate(product?.brand, {
        $pull: {
          products: product._id,
        },
      }).exec();
      res.status(200).json({
        status: true,
        message: "Product successfully deleted.",
        data: product,
      });
    } else {
      res.status(404).json({ status: false, message: "Product not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        status: false,
        message: "Something went wrong while deleting the product.",
      });
  }
};

export = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
