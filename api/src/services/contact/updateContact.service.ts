import { Contact } from "@prisma/client";
import { database } from "../../database";
import { AppError } from "../../errors/appError";

const updateContactService = async (
  user_id: string,
  {
    contact_id,
    address,
    birth_date,
    cep,
    city,
    complement,
    description,
    district,
    name,
    number,
    phone,
    state,
  }: Contact
): Promise<void> => {
  const contactExists = await database.contact
    .findUniqueOrThrow({ where: { contact_id } })
    .catch(() => {
      throw new AppError(
        `O contato de id ${contact_id} não existe na base de dados`,
        400
      );
    });

  if (contactExists.user_id !== user_id) {
    throw new AppError(
      "Você não tem permissão para editar contatos de terceiros",
      401
    );
  }

  if (phone) {
    const phoneAlreadyExists = await database.contact.findMany({
      where: { AND: [{ phone: { equals: phone } }, { user_id }] },
    });
    if (phoneAlreadyExists.length > 0) {
      throw new AppError(
        `Seu contato ${phoneAlreadyExists[0].name}, já possui esse número de telefone`,
        303
      );
    }
  }

  await database.contact.update({
    where: { contact_id },
    data: {
      address,
      birth_date,
      cep,
      city,
      complement,
      district,
      name,
      number,
      phone,
      state,
      description,
    },
  });

  return;
};

export { updateContactService };
