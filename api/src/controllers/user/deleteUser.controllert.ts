import { Request, Response } from "express";
import { deleteUserService } from "../../services/user/deleteUser.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req.user.id);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};
export { deleteUserController };
