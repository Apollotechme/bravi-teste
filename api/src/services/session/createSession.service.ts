import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { database } from "../../database";

interface ISessionRequest {
  email: string;
  password: string;
}

const createSessionClientService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const user = await database.user
    .findUniqueOrThrow({
      where: { email },
    })
    .catch(() => {
      throw new AppError("Login ou senha inválidos", 401);
    });

  const matchPassword = await compare(String(password), user.password);

  if (!matchPassword) {
    throw new AppError("Login ou senha inválidos", 401);
  }

  const token = jwt.sign(
    {
      id: user.user_id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export { createSessionClientService };
