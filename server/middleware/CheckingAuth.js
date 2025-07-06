import jwt from "jsonwebtoken";
import userModel from "../models/AuthSchema.js";

const ensureAuthenticated = async (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(403).send({
      success: false,
      message: "Unauthorized: JWT token is required",
    });
  }
  const auth = req.cookies.token;
  try {
    const decoded = jwt.verify(auth, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "Unauthorized: JWT token is invalid or expired",
    });
  }
};

export default ensureAuthenticated;
