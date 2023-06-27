import * as yup from "yup";

interface IContactRequest {
  name: string;
  photo_url?: string | null;
  phone: string;
  birth_date?: string | null;
  address?: string | null;
  city?: string | null;
  district?: string | null;
  number?: string | null;
  complement?: string | null;
  description?: string | null;
}

const registerContactSchema: yup.Schema<IContactRequest> = yup.object().shape({
  name: yup
    .string()
    .max(50, "o campo nome não pode ter mais de 50 caracteres")
    .required("o campo nome é obrigatório"),
  email: yup
    .string()
    .max(50, "o campo email não pode ter mais de 50 caracteres")
    .email("o formato do e-mail é inválido")
    .required("o campo nome é obrigatório"),
  photo_url: yup.string().notRequired(),
  phone: yup
    .string()
    .max(11, "o campo telefone não pode ter mais de 11 carcteres (DD996######")
    .required("o campo telefone é obrigatório"),
  birth_date: yup.string().notRequired(),
  address: yup
    .string()
    .max(80, "o campo endereço não pode conter mais que 80 caracteres")
    .notRequired(),
  city: yup
    .string()
    .max(50, "o campo cidade não pode conter mais que 50 caracteres")
    .notRequired(),
  cep: yup
    .string()
    .max(
      8,
      "o campo cep não pode ter mais de 8 dígitos, não inclua hífens ou pontos"
    )
    .notRequired(),
  district: yup
    .string()
    .max(50, "o campo bairro não pode ter mais de 50 caracteres")
    .notRequired(),
  state: yup
    .string()
    .max(20, "o campo estado não pode ter mais que 20 caracteres")
    .notRequired(),
  number: yup
    .string()
    .max(20, "o campo númkero não pode ter mais de 20 caracteres")
    .notRequired(),
  complement: yup
    .string()
    .max(50, "o campo complemento não pode ter mais de 50 caracteres")
    .notRequired(),
  description: yup
    .string()
    .max(360, "o campo descrição não pode ter mais de 360 caracteres")
    .notRequired(),
});

export { registerContactSchema };
