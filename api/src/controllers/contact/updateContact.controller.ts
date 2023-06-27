import { Request, Response } from "express";
import { updateContactService } from "../../services/contact/updateContact.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const updateContactController = async (req: Request, res: Response) => {
  try {
    await updateContactService(req.user.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { updateContactController };
