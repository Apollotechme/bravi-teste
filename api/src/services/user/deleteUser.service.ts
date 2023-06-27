import { database } from "../../database";
import { AppError } from "../../errors/appError";

const deleteUserService = async (user_id: string): Promise<void> => {
  const user = await database.user
    .findUniqueOrThrow({ where: { user_id } })
    .catch(() => {
      throw new AppError("Usuário não encontrado", 400);
    });

  if (user.user_id !== user_id) {
    throw new AppError(
      "Você não tem autorização para excluir outros usuários",
      401
    );
  }

  await database.user.delete({ where: { user_id } });
};

export { deleteUserService };
