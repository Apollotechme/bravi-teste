import { Request, Response } from "express";
import { deleteContactService } from "../../services/contact/deleteContact.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const deleteContactController = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  try {
    await deleteContactService(req.user.id, contact_id);
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { deleteContactController };
