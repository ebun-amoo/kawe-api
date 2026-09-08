import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./auth/authRoutes";
import cookieParser from "cookie-parser";
import authMiddleWare from "./middleware/authMiddleware";
import userRoutes from "./user/userRoutes";
import lessonRoutes from "./lesson/lessonRoutes";
import errorHandler from "./middleware/errorHandler";

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
app.use("/api/v1/lessons", authMiddleWare, lessonRoutes);

app.use(errorHandler);
export default app;