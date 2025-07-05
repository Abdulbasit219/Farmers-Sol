import { comparePassword, hashedPassword } from "../helper/bcrypt_helper.js";
import userModel from "../models/AuthSchema.js";
import JWT from "jsonwebtoken";

const registerationController = async (req, res) => {
  try {
    const { name, email, password, role, isAdmin } = req.body;

    //validation
    if (!name || !email || !password || !role) {
      return res.send({ message: "All fields are required" });
    }

    //check user existing in DB
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already Register in this email address",
      });
    }

    //password hashing
    const hashPassword = await hashedPassword(password);

    // save user in DB
    const user = await new userModel({
      name,
      email,
      password: hashPassword,
      role,
      isAdmin,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in RegisterationController",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //matchPassword
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    //generate JWT
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const { password: _, ...rest } = user._doc;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //send details
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: rest,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in LoginController",
    });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { loginController, registerationController, checkAuth };
