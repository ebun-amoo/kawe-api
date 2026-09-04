import { Router } from "express";
import registerUserController from "./controllers/registerUserController";
import loginUserController from "./controllers/loginUserController";
import refreshAccessTokenController from "./controllers/refreshAccessTokenController";
import logoutUserController from "./controllers/logoutUserController";

const authRoutes = Router();

authRoutes.post('/register', registerUserController);
authRoutes.post('/login', loginUserController);
authRoutes.post('/refresh', refreshAccessTokenController);
authRoutes.post('/logout', logoutUserController);

export default authRoutes;