import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import checkIsAdmin from "../middleware/CheckAdmin.js";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controller/Category.js";

const router = express.Router();

router.post('/create', ensureAuthenticated, checkIsAdmin, createCategory);

router.get('/', getAllCategories);

router.put('/update-category/:id', ensureAuthenticated, checkIsAdmin, updateCategory);

router.delete('/delete-category/:id', ensureAuthenticated, checkIsAdmin, deleteCategory);

export default router;