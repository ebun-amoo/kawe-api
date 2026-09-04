import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { payloadSchema } from "../../schemas/authSchemas";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

const authMiddleWare = (req: Request, res: Response, next:NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Missing authorization header"
      });
    }

    const match = header.match(/^Bearer\s+(\S+)$/);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header"
      });
    }

    const token = match[1];

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    const decodedResult = payloadSchema.safeParse(decoded);

    if (!decodedResult.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    req.user = {
      id: decodedResult.data.sub,
      role: decodedResult.data.role
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Access token has expired"
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default authMiddleWare;