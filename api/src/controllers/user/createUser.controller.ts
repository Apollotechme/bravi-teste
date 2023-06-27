import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";
import { createUserService } from "../../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    await createUserService(req.body);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { createUserController };
