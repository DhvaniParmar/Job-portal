import express from "express";
import { getUser, login,logout, register, updatePassword, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
router.get("/logout", isAuthenticated,logout);
//first it will autheticate then i will logout

router.post("/getuser", getUser);
router.put("/update/profile", isAuthenticated, updateProfile)
//updating our password in /password route navigation
router.put("/update/profile/password", isAuthenticated, updatePassword)
export default router;
