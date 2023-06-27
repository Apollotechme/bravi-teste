import { User } from "@prisma/client";
import { database } from "../../database";
import { AppError } from "../../errors/appError";
import { hashSync } from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const updateUserService = async (
  user_id: string,
  { birth_date, email, name, password, phone, photo_url }: User
): Promise<void> => {
  const user = await database.user
    .findUniqueOrThrow({ where: { user_id } })
    .catch(() => {
      throw new AppError("Usuário não encontrado", 404);
    });

  const updateUser = await database.user
    .update({
      where: { user_id: user.user_id },
      data: {
        birth_date: birth_date ? new Date(birth_date) : user.birth_date,
        email,
        name,
        photo_url,
        phone,
        password: password ? hashSync(password, 10) : user.password,
      },
    })
    .catch((err) => {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new AppError(
            `Já existe um cadastro com esse ${err.meta!.target}`
          );
        }
      }
    });

  Reflect.deleteProperty(updateUser!, "password");
};

export { updateUserService };
