import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Get current user - protected route
router.get("/me", protect, getCurrentUser);

export default router;
