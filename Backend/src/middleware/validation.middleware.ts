import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";

// Validate registration data
export const validateRegister = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").optional().isString().withMessage("Name must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((error: ValidationError) => ({
          field: error.type === "field" ? error.path : error.type,
          message: error.msg,
        })),
      });
    }
    next();
  },
];

// Validate login data
export const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 1 }).withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((error: ValidationError) => ({
          field: error.type === "field" ? error.path : error.type,
          message: error.msg,
        })),
      });
    }
    next();
  },
];
