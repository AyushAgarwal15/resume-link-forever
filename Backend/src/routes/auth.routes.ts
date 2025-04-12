import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validation.middleware";

const router = Router();

// Register route
router.post("/register", validateRegister, register);

// Login route
router.post("/login", validateLogin, login);

export default router;
