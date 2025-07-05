import express from "express";
import { checkAuth, loginController, registerationController } from "../controller/Auth.js";
import ensureAuthenticated from "../middleware/CheckingAuth.js";

const router = express.Router();

router.post('/registeration', registerationController)

router.post('/login', loginController);

router.get('/check', ensureAuthenticated, checkAuth)

export default router;