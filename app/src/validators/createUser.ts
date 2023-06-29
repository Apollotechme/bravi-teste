import * as yup from "yup";

const createUserSchema = yup.object().shape({
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
    .min(8, "A senha deve conter no mínimo 8 caracteres.")
    .matches(
      /(^(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\W|_])).+$/,
      "Deve conter: letras maiúsculas, minúsculas, números e ao menos um símbolo."
    ),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser idênticas."),
  phone: yup
    .string()
    .max(11, "o campo telefone não pode ter mais de 11 carcteres (DD996######")
    .required("o campo telefone é obrigatório"),
});

export default createUserSchema;
