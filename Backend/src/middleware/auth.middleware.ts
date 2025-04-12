import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: "Not authorized, user not found",
        });
        return;
      }

      // Add user to request object
      (req as any).user = user;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};
