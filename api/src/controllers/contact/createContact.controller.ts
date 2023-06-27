import { Request, Response } from "express";
import { createContactService } from "../../services/contact/createContact.service";
import { AppError } from "../../errors/appError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";

const createContactController = async (req: Request, res: Response) => {
  try {
    await createContactService(req.user.id, req.body);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { createContactController };
