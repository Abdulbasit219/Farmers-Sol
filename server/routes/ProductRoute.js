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
  getProductById,
  searchProduct,
  filterProducts,
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

// for sigle product id
router.get("/get-productById/:id", getProductById);

//pending images updation
router.patch(
  "/update-product/:id",
  cloudinaryfileUpload.array("imageUrl", 5),
  ensureAuthenticated,
  updateProduct
);

// for farmer id
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

router.post("/search", searchProduct);

router.get("/filter", filterProducts);

export default router;
