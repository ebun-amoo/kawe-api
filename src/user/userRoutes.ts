import { Router } from "express";
import getCurrentUserController from "./controllers/getCurrentUserController";

const userRoutes = Router();

userRoutes.get('/me', getCurrentUserController);

export default userRoutes;