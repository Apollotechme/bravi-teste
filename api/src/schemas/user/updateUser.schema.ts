import * as yup from "yup";

interface IUserUpdate {
  name?: string | null;
  password?: string | null;
  phone?: string | null;
  email?: string | null;
}

const updateUserSchema: yup.Schema<IUserUpdate> = yup.object().shape({
  name: yup
    .string()
    .max(50, "o campo nome não pode ter mais de 50 caracteres")
    .notRequired(),
  email: yup
    .string()
    .max(50, "o campo email não pode ter mais de 50 caracteres")
    .email("o formato do e-mail é inválido")
    .notRequired(),
  password: yup
    .string()
    .max(60, "o campo senha não pode ter mais de 60 caracteres")
    .notRequired(),
  phone: yup
    .string()
    .max(11, "o campo telefone não pode ter mais de 11 carcteres (DD996######")
    .notRequired(),
});

export { updateUserSchema };
