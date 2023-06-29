import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { database } from "../../database";
import { AppError } from "../../errors/appError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const createUserService = async ({
  email,
  name,
  password,
  phone,
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
