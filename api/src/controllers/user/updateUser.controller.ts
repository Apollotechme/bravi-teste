import { Request, Response } from "express";
import { updateUserService } from "../../services/user/updateUser.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const updateUserController = async (req: Request, res: Response) => {
  try {
    await updateUserService(req.user.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { updateUserController };
