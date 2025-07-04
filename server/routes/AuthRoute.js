import express from "express";
import { loginController, registerationController } from "../controller/Auth.js";

const router = express.Router();

router.post('/registeration', registerationController)

router.post('/login', loginController);

export default router;