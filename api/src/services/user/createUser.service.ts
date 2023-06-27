import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { database } from "../../database";
import { AppError } from "../../errors/appError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const createUserService = async ({
  birth_date,
  email,
  name,
  password,
  phone,
  photo_url,
}: User): Promise<void> => {
  const hashedPassword = hashSync(password, 10);

  const userAlreadyExists = await database.user.findFirst({ where: { email } });

  if (userAlreadyExists) {
    throw new AppError("Email já cadastrado", 401);
  }

  await database.user
    .create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        photo_url,
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
};

export { createUserService };
