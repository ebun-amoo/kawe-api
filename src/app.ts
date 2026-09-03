import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./auth/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok"
    },
    message: "Kawe is running"
  })
});

app.use("/api/v1/auth", authRoutes);

import prisma from "./lib/prisma";

app.get("/db-test", async (_req, res) => {
  const userCount = await prisma.user.count();

  res.status(200).json({
    success: true,
    data: {
      userCount,
    },
    message: "Database connection successful",
  });
});

export default app;