import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./auth/authRoutes";
import cookieParser from "cookie-parser";
import authMiddleWare from "./auth/middleware/authMiddleware";
import userRoutes from "./user/userRoutes";

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
app.use("/api/v1/user", authMiddleWare, userRoutes);

export default app;