import express from "express";
import { register, login } from "../controller/authController.js";

const router = express.Router();

router.post("/register-user", register);
router.post("/login-user", login);
router.get("/user-info", getUserInfo);

export default router;
