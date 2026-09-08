import { Router } from "express";
import createLessonController from "./controllers/createLessonController";
import requireRole from "../middleware/requireRole";
import { UserRole } from "../generated/prisma/enums";
import getLessonController from "./controllers/getLessonController";
import getALessonController from "./controllers/getALessonController";
import updateLessonController from "./controllers/updateLessonController";
import publishLessonController from "./controllers/publishLessonController";
import deleteLessonController from "./controllers/deleteLessonController";

const lessonRoutes = Router();

lessonRoutes.post('/', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), createLessonController);
lessonRoutes.get('/', getLessonController);
lessonRoutes.get('/:lessonId', getALessonController);
lessonRoutes.patch('/:lessonId', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), updateLessonController);
lessonRoutes.patch('/:lessonId/publish', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), publishLessonController);
lessonRoutes.delete('/:lessonId/', requireRole(UserRole.ADMIN, UserRole.INSTRUCTOR), deleteLessonController);

export default lessonRoutes;