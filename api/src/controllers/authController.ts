import { Request, Response } from "express";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import config from "../config";
import User, { IUser } from "../models/user";
import Settings from "../models/settings";

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, panel } = req.body;

    const user: any = await User.findOne({ email: email, role: panel });
    // Check User exists
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "Account doesn't exists. Please register.",
      });
    }
    // Check password exists
    if (!user.password) {
      return res.status(409).send({
        status: false,
        message: "Error with your account.Please contact administrator.",
      });
    }

    // check the roles
    if (panel && panel == "admin") {
      if (!user.role || user.role !== "admin") {
        return res.status(403).send({
          status: false,
          code: "UnauthorizedError",
          message: "User doesn't have enough permission.",
        });
      }
    }

    if (panel && panel == "user") {
      if (!user.role || user.role !== "user") {
        return res.status(403).send({
          status: false,
          code: "UnauthorizedError",
          message: "User doesn't have enough permission.",
        });
      }
    }

    // checking password validation;
    const passwordIsValid = bcryptjs.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({
        status: false,
        message: "Invalid Credential. Please Try again.",
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, config.jwt.SECRET, {
      expiresIn: config.jwt.TOKEN_TTL,
      issuer: config.jwt.ISSUER,
    });

    // response user;
    const resUser = user.toObject();
    delete resUser.password;
    
    
    
    // update visitors
    await Settings.updateOne({
      $inc:{
        visitors:1
      }
    })
    
    return res.status(200).send({
      status: true,
      message: "Successfully login.",
      accessToken: token,
      user: resUser,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Error logging in user. Please try again",
    });
  }
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user_exist = await User.findOne({ email: email });

    if (user_exist) {
      return res.status(409).send({
        status: false,
        message: "User already exists with this email.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).send({
        status: false,
        message: "Password does not match. please try again.",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      status:'active',
      password: bcryptjs.hashSync(password),
    });

  
    const token = jwt.sign({ id: user._id }, config.jwt.SECRET, {
      expiresIn: config.jwt.TOKEN_TTL,
      issuer: config.jwt.ISSUER,
    });
    const resUser = user.toObject();
    delete resUser.password;
    return res.status(200).send({
      status: true,
      message: "Successfully created account",
      accessToken: token,
      user: resUser,
    });
  } catch (e) {
    return res
      .status(400)
      .send({
        status: false,
        message: "Something went wrong while registering user.",
      });
  }
};

const changePassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      res.status(404).json({
        status: false,
        message: "Account not found.",
      });
    }
    const currentPasswordIsValid = bcryptjs.compareSync(
      currentPassword,
      oldUser.password
    );
    if (!currentPasswordIsValid) {
      return res.status(409).json({
        status: false,
        message: "Current password does not match with old password.",
      });
    }

    oldUser.password = bcryptjs.hashSync(newPassword);
    await oldUser.save();
    res.status(200).json({
      status: true,
      message: "Password updated successfully.",
      data: oldUser,
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    res.status(200).json({
      status: true,
      message: "Successfully fetched user.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong while fetching profile.",
    });
  }
};

const profileUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Account successfully updated.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong while updating account.",
    });
  }
};

export = { login,register, changePassword, profile, profileUpdate };
