import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import checkIsAdmin from "../middleware/CheckAdmin.js";
import { createCategory, getAllCategories } from "../controller/Category.js";

const router = express.Router();

router.post('/create', ensureAuthenticated, checkIsAdmin, createCategory);

router.get('/', getAllCategories);

export default router;