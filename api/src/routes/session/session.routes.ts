import { Router } from "express";
import { createSessionController } from "../../controllers/session/createSession.controller";

const sessionApp = Router();

sessionApp.post("/", createSessionController);

export { sessionApp };
