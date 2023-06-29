import * as yup from "yup";

const registerConcactSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "o campo nome não pode ter mais de 50 caracteres")
    .required("o campo nome é obrigatório"),
  phone: yup
    .string()
    .max(11, "o campo telefone não pode ter mais de 11 carcteres (DD996######")
    .required("o campo telefone é obrigatório"),
  address: yup
    .string()
    .max(80, "o campo endereço não pode conter mais que 80 caracteres"),
  city: yup
    .string()
    .max(50, "o campo cidade não pode conter mais que 50 caracteres"),
  district: yup
    .string()
    .max(50, "o campo bairro não pode ter mais de 50 caracteres"),
  state: yup
    .string()
    .max(20, "o campo estado não pode ter mais que 20 caracteres"),
  number: yup
    .string()
    .max(20, "o campo número não pode ter mais de 20 caracteres"),
  complement: yup
    .string()
    .max(50, "o campo complemento não pode ter mais de 50 caracteres"),
  description: yup
    .string()
    .max(360, "o campo descrição não pode ter mais de 360 caracteres"),
});

export default registerConcactSchema;
