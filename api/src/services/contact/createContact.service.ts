import { Contact } from "@prisma/client";
import { database } from "../../database";
import { AppError } from "../../errors/appError";

const createContactService = async (
  user_id: string,
  {
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
  const contactAlreadyExists = await database.contact.findMany({
    where: { AND: [{ phone: { equals: phone } }, { user_id }] },
  });

  if (contactAlreadyExists.length > 0) {
    throw new AppError(
      `Seu contato ${contactAlreadyExists[0].name}, já possui esse número de telefone`,
      303
    );
  }

  await database.contact
    .create({
      data: {
        name,
        phone,
        address,
        birth_date,
        cep,
        city,
        complement,
        description,
        district,
        number,
        owner: { connect: { user_id } },
        state,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  return;
};

export { createContactService };
