import { comparePassword, hashedPassword } from "../helper/bcrypt_helper.js";
import userModel from "../models/AuthSchema.js";
import JWT from "jsonwebtoken";
import productModel from "../models/ProductSchema.js";

const registerationController = async (req, res) => {
  try {
    const { name, email, password, role, isAdmin } = req.body;

    //validation
    if (!name || !email || !password || !role) {
      return res.send({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.send({
        message:
          "password must be atleast 8 charachter long including Special Charachter",
      });
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
      secure: true, // false for local dev without https
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

const getUsers = async (req, res) => {
  try {
    const { query } = req.query;

    let filter = { _id: { $ne: req.user._id } };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ];
    }

    const users = await userModel.find(filter).select("-password");

    if (!users) {
      return res.status(404).send({
        success: false,
        message: "No user found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User found Successfully",
      users,
      totalUsers: users.length + 1, //including me in length
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, password, role, profilePic } = req.body;

    // If a new file is uploaded, update profilePic
    if (req.file && req.file.path) {
      profilePic = req.file.path;
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    //check existing email
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "A user already exists with this email address",
        });
      }
    }

    // password hashing (updated)
    let updatedPassword = user.password;
    if (password) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters long." });
      }
      updatedPassword = await hashedPassword(password);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = updatedPassword;
    user.role = role || user.role;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    const { password: _, ...updatedUser } = user._doc;

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    await productModel.deleteMany({ createdBy: id });

    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  loginController,
  registerationController,
  checkAuth,
  getUsers,
  updateUser,
  deleteUser,
};
