import { Contact } from "@prisma/client";
import { database } from "../../database";

interface IContactQuerySearch {
  contact_id?: string;
  name?: string;
  phone?: string;
}

const searchContactService = async (
  user_id: string,
  { contact_id, name, phone }: IContactQuerySearch
): Promise<Contact[] | void> => {
  const findContacts = await database.contact.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: { contains: name },
              phone: { contains: phone },
              contact_id,
            },
          ],
        },
        { user_id },
      ],
    },
  });

  return findContacts;
};

export { searchContactService };
