import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import { createProducts } from "../controller/Products.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";

const router = express.Router();

router.post('/create-products', cloudinaryfileUpload.array("imageUrl", 5), ensureAuthenticated, createProducts)

export default router