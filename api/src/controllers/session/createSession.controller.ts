import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";
import { createSessionClientService } from "../../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const token = await createSessionClientService(req.body);
    return res.status(200).json({ token: token });
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { createSessionController };
