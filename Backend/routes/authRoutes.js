import express from "express";
import { register, login, getUser, updateUserSettings, deleteUser, assignGroupCodes } from "../controller/authController.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.put("/user/:id/settings", updateUserSettings);
router.post("/register-user", register);
router.post("/login-user", login);
router.delete("/user/:id", deleteUser);
router.post("/assign-group-codes", assignGroupCodes);

export default router;
