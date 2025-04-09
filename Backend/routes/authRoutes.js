import express from "express";
import { register, login, getUser, updateUserSettings } from "../controller/authController.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.put("/user/:id/settings", updateUserSettings);
router.post("/register-user", register);
router.post("/login-user", login);

export default router;
