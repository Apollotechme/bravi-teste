import { Request, Response } from "express";
import { getOwnerUserDataService } from "../../services/user/getOwnerUser.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const getOWnerUserController = async (req: Request, res: Response) => {
  try {
    if (!req.user.id) {
      return res
        .status(400)
        .json({
          message:
            "O token é invalido ou expirrou, por favor faça login novamente",
        });
    }
    const userData = await getOwnerUserDataService(req.user.id);
    return res.json(userData);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { getOWnerUserController };
