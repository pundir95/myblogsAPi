import express from "express";
import { registerController, loginRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginRegister);

export default router;