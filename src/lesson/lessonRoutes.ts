import { Router } from "express";
import createLessonController from "./controllers/createLessonController";
import requireRole from "../middleware/requireRole";
import { UserRole } from "../generated/prisma/enums";
import getLessonController from "./controllers/getLessonController";
import getALessonController from "./controllers/getALessonController";

const lessonRoutes = Router();

lessonRoutes.post('/', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), createLessonController);
lessonRoutes.get('/', getLessonController);
lessonRoutes.get('/:lessonId', getALessonController);

export default lessonRoutes;