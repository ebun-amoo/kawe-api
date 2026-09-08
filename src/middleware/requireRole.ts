import { Response, Request, NextFunction } from "express";
import { UserRole } from "../generated/prisma/enums";

const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  }
}

export default requireRole;