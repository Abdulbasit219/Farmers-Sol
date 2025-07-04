import { hashedPassword } from "../helper/bcrypt.js";
import userModel from "../models/AuthSchema.js";

//pending
const loginController = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in LoginController",
    });
  }
};

const registerationController = async (req, res) => {
  try {
    const { name, email, password, role, isAdmin } = req.body;

    //validation
    if (!name || !email || !password || !role) {
      return res.send({ message: "All fields are required" });
    }

    //check user existing in DB
    const existinUser = await userModel.findOne({ email });
    if (existinUser) {
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

export { loginController, registerationController };
