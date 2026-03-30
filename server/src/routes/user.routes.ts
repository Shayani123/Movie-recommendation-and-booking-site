import { Router } from "express";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controllers";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register" , registerUser);
router.get("/profile" , auth, getProfile);
router.put("/login" , loginUser);
router.post("/logout" , logoutUser);

export default router;