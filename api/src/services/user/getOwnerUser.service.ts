import { User } from "@prisma/client";
import { database } from "../../database";
import { AppError } from "../../errors/appError";

const getOwnerUserDataService = async (user_id: string): Promise<User> => {
  const user = await database.user
    .findUniqueOrThrow({ where: { user_id } })
    .catch(() => {
      throw new AppError(
        "Requisição inválida ou sessão expirada, por favor faça o login novamente",
        400
      );
    });

  Reflect.deleteProperty(user, "password");

  return user;
};

export { getOwnerUserDataService };
