import { Request, Response } from "express";

import Order, { IOrder } from "../../models/order";
import Product from "../../models/product";

// for PDF
import PDFDocument from "pdfkit";
import fs from "fs";
import Settings, { ISettings } from "../../models/settings";
import { generatePdfInvoice } from "../../utils/invoice";

// For EMail 
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport"
import Email from "email-templates";
import config from "../../config";

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:config.mail.api_key
  }
}));

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "_id name email phone")
      .lean();

    res.status(200).json({
      status: true,
      message: "Successfully fetched orders.",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "_id name")
      .populate("product")
      .lean();

    if (order) {
      res.status(200).json({
        status: true,
        message: "Successfully get the order",
        data: order,
      });
    } else {
      res.status(404).json({ status: false, message: "Order not found." });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderStatus } = req.body;
    const orderId = req.params.id;
    const prevOrder = await Order.findById(orderId);
    if (!prevOrder) {
      res.status(404).json({
        status: false,
        message: "Order not found.",
      });
      return;
    }

    if (prevOrder?.paymentStatus !== "paid" && orderStatus === "delivered") {
      const paidAt = new Date();
      const paymentStatus = "paid";
      // const paymentMethod = "cod";

      // here product data updates after successfully delivered
      const { orderItems } = prevOrder;

      for (const item of orderItems) {
        const { product, quantity } = item;
        const productItem = await Product.findById(product);
        if (!productItem) {
          res.status(404).json({
            status: false,
            message: "Product not found.",
          });
          return;
        }

        if (!quantity || (quantity && quantity < 1)) {
          res.status(400).json({
            status: false,
            message: "Item should have at least one quantity.",
          });
          return;
        }

        const availableQty = productItem.quantity;
        if (availableQty <= 0) {
          res.status(400).json({
            status: false,
            message: "Item out of stock.",
          });
          return;
        }
        if (availableQty < quantity) {
          res.status(400).json({
            status: false,
            message:
              "Item out of stock. Required quantity should be greater than quantity available quantity.",
          });
          return;
        }

        const remainingQuantity = availableQty - quantity;
        // productItem.quantity = remainingQuantity;
        // productItem.save();
        const newProduct = await Product.findByIdAndUpdate(
          product,
          { quantity: remainingQuantity },
          { new: true }
        );
      }
      const order = await (
        await Order.findByIdAndUpdate(
          req.params.id,
          { paidAt, paymentStatus, orderStatus },
          { new: true }
        )
      ).populate("user", "_id name email phone");

      res.status(200).json({
        status: true,
        message: "Order updated successfully.",
        data: order,
      });
      
      //  send email notification
      var email = {
        to:'raiprajwal500@gmail.com',
        from: 'raiprajwal500@gmail.com',
        subject: 'Order is placed successfully.',
        text: 'Awesome sauce',
        html: '<b>Your order has been placed successfully.</b>'
    };
     
    transporter.sendMail(email, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log('success',res);
    });
    
      return;
    } else {
      const paidAt = prevOrder.paidAt ? prevOrder.paidAt : new Date();

      const order = await (
        await Order.findByIdAndUpdate(
          req.params.id,
          { paidAt, orderStatus },
          { new: true }
        )
      ).populate("user", "_id name email phone");

      res.status(200).json({
        status: true,
        message: "Order updated successfully.",
        data: order,
      });
      
   
      return;
    }

    // Here send email notification to customer;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      return res.status(200).json({
        status: true,
        message: "Order deleted successfully.",
        data: order,
      });
    }
    return res.status(404).json({ status: false, message: "Order not found." });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

const getOrderInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId })
      .populate("user", "_id name email phone")
      .lean();
    const systemInfo = await Settings.findOne();

    if (!order) {
      res.status(404).json({
        status: false,
        message: "Order not found.",
      });
      return;
    }

    const path = await generatePdfInvoice(
      order,
      systemInfo,
      `uploads/orders/${orderId}.pdf`
    );

    res.download(path, (error) => {
      console.error(error);
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export = {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderInvoice,
};
