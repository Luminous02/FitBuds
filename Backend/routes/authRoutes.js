import express from "express";
import { register, login, getUser } from "../controller/authController.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/register-user", register);
router.post("/login-user", login);

export default router;
