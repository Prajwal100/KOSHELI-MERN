import { Request, Response } from "express";
import db from "../../models";
import Brand from "../../models/brand";
import Category from "../../models/category";
import Order from "../../models/order";
import Product from "../../models/product";
import Slider from "../../models/slider";
import SubCategory from "../../models/subcategory";
import User from "../../models/user";
import { valueWithMonths } from './../../utils/helper';

const getDashboardWidget = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalSliders = await Slider.count();
    const totalCategories = await Category.count();
    const totalSubCategories = await SubCategory.count();
    const totalBrands = await Brand.count();
    const totalProducts = await Product.count();
    const totalUsers = await User.find({ role: "user" }).count();
    const totalOrders = await Order.count();
    const totalIncome = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          // orderStatus: "delivered"
        },
      },
      {
       
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalAmount: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const data = {
      totalSliders,
      totalCategories,
      totalSubCategories,
      totalBrands,
      totalProducts,
      totalUsers,
      totalOrders,
      totalIncome,
    };
    res.status(200).json({
      status: true,
      data,
      message: "Successfully fetched data.",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const userReportByMonth = async () => {
  const userReport = await User.aggregate([
    {
      $match: {
        // createdAt: { $gte: ago, $lte: today },
        role: "user",
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return userReport.map((data) => {
    return {
      month: data._id,
      count: data.count,
    };
  });


};


const getUserReportByMonth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userReport = await userReportByMonth();

    let map = {};
    valueWithMonths.forEach((item) => (map[item.month] = item));
    userReport.forEach((item) => (map[item.month] = item));
    const result = Object.values(map);

    res.send({ status: true, data: result });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
    });
  }
};

const orderReportByMonth = async () => {
  const orderReports = await Order.aggregate([
    {
      $match: {
        // createdAt: { $gte: ago, $lte: today },
        paymentStatus: "paid",
        orderStatus:"delivered"
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: "$totalPrice" },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return orderReports.map((data) => {
    return {
      month: data._id,
      count: data.count,
    };
  });


};

const getOrderReportByMonth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderReports = await orderReportByMonth();

    let map = {};
    valueWithMonths.forEach((item) => (map[item.month] = item));
    orderReports.forEach((item) => (map[item.month] = item));
    const result = Object.values(map);

    res.send({ status: true, data: result });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
    });
  }
};

export = {
  getDashboardWidget,
  getUserReportByMonth,
  getOrderReportByMonth,
};
