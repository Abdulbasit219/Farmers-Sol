import express from "express";
import {
  checkAuth,
  getUsers,
  loginController,
  updateUser,
  registerationController,
} from "../controller/Auth.js";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import checkIsAdmin from "../middleware/CheckAdmin.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";

const router = express.Router();

router.post("/registeration", registerationController);

router.post("/login", loginController);

router.get("/check", ensureAuthenticated, checkAuth);

router.get("/", ensureAuthenticated, checkIsAdmin, getUsers);

router.put("/update_user/:id", ensureAuthenticated, cloudinaryfileUpload.single('profilePic'), updateUser)

export default router;
