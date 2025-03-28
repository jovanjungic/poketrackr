import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", authorize, getUser); // Retrieve user info

export default router;