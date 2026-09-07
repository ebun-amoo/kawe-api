import { Router } from "express";
import createLessonController from "./controllers/createLessonController";
import requireRole from "../middleware/requireRole";
import { UserRole } from "../generated/prisma/enums";

const lessonRoutes = Router();

lessonRoutes.post('/', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), createLessonController);

export default lessonRoutes;