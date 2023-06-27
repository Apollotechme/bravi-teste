import { Request, Response } from "express";
import { searchContactService } from "../../services/contact/searchContact.service";

const searchContactController = async (req: Request, res: Response) => {
  const searchResult = await searchContactService(req.user.id, req.query);
  return res.json(searchResult);
};
export { searchContactController };
