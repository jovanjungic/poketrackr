import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register); // Register a User
router.post("/login", login); // Login a User
router.get("/logout", authorize, logout); // Log out a user if a user is logged in
router.get("/check", authorize, (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  });

export default router;