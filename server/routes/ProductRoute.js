import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import {
  createProducts,
  deleteProducts,
  getProducts,
  updateProduct,
  getProductsbyFarmerId,
  getProductsByCategory,
  approvedProducts,
  getProductById
} from "../controller/Products.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";
import checkIsAdmin from "../middleware/CheckAdmin.js";

const router = express.Router();

router.get("/get-products", getProducts);

router.post(
  "/create-products",
  cloudinaryfileUpload.array("imageUrl", 5),
  ensureAuthenticated,
  createProducts
);

router.delete("/delete-product/:id", ensureAuthenticated, deleteProducts);

router.get("/get-productById/:id", ensureAuthenticated, getProductById)

//pending images updation
router.patch("/update-product/:id", ensureAuthenticated, updateProduct);

router.get("/get-products/:id", ensureAuthenticated, getProductsbyFarmerId);

router.get(
  "/get-productsByCategory/:id",
  ensureAuthenticated,
  getProductsByCategory
);

// for admin products approval
router.patch(
  "/approve/:id",
  ensureAuthenticated,
  checkIsAdmin,
  approvedProducts
);

export default router;
