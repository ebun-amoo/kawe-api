import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/client";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

export const generateAccessToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
};