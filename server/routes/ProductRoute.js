import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import { createProducts, deleteProducts } from "../controller/Products.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";

const router = express.Router();

router.post('/create-products', cloudinaryfileUpload.array("imageUrl", 5), ensureAuthenticated, createProducts);

router.delete('/delete-product/:id', ensureAuthenticated, deleteProducts);

export default router