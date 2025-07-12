import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import { createProducts, deleteProducts, getProducts, updateProduct, getProductsbyFarmerId, getProductsByCategory } from "../controller/Products.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";

const router = express.Router();

router.get('/get-products', getProducts);

router.post('/create-products', cloudinaryfileUpload.array("imageUrl", 5), ensureAuthenticated, createProducts);

router.delete('/delete-product/:id', ensureAuthenticated, deleteProducts);

router.put('/update-product/:id', ensureAuthenticated, updateProduct);

//get product by farmer id
router.get('/get-products/:id', ensureAuthenticated, getProductsbyFarmerId);

router.get('/get-productsByCategory/:id', ensureAuthenticated, getProductsByCategory)

export default router