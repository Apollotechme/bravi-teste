import { database } from "../../database";
import { AppError } from "../../errors/appError";

const deleteContactService = async (
  user_id: string,
  contact_id: string
): Promise<void> => {
  const contact = await database.contact
    .findUniqueOrThrow({
      where: { contact_id },
    })
    .catch(() => {
      throw new AppError(
        `Nenhum contato com o id ${contact_id} foi encontrado`,
        400
      );
    });

  if (contact.user_id !== user_id) {
    throw new AppError(
      "Você não tem autorização para alterar recursos de terceiros",
      401
    );
  }

  await database.contact.delete({ where: { contact_id } });
  return;
};

export { deleteContactService };
