import * as yup from "yup";

export interface IUserRequest {
  name: string;
  password: string;
  photo_url?: string | null;
  phone: string;
  birth_date?: string | null;
  email: string;
}

const registerUserSchema: yup.Schema<IUserRequest> = yup.object().shape({
  name: yup
    .string()
    .max(50, "o campo nome não pode ter mais de 50 caracteres")
    .required("o campo nome é obrigatório"),
  email: yup
    .string()
    .max(50, "o campo email não pode ter mais de 50 caracteres")
    .email("o formato do e-mail é inválido")
    .required("o campo e-mail é obrigatório"),
  password: yup
    .string()
    .max(60, "o campo senha não pode ter mais de 60 caracteres")
    .required("o campo senha é obrigatório"),
  photo_url: yup.string().notRequired(),
  phone: yup
    .string()
    .max(11, "o campo telefone não pode ter mais de 11 carcteres (DD996######")
    .required("o campo telefone é obrigatório"),
  birth_date: yup.string().notRequired(),
});

export { registerUserSchema };
