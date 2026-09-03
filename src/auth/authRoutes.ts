import { Router } from "express";
import registerUserController from "./controllers/registerUserController";
import loginUserController from "./controllers/loginUserController";

const authRoutes = Router();

authRoutes.post('/register', registerUserController);
authRoutes.post('/login', loginUserController);

export default authRoutes;