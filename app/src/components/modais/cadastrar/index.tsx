import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingIcons from "react-loading-icons";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import { Api } from "../../../services/api";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import InputCommon from "../../input";

type IModalCadastro = {
  setModalCad: Function;
};
type IContactRequest = {
  name: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  district?: string | null;
  number?: string | null;
  complement?: string | null;
  description?: string | null;
};

const ModalCadastrar = (props: IModalCadastro) => {
  const token = localStorage.getItem("@BraviToken");

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(50, "o campo nome não pode ter mais de 50 caracteres")
      .required("o campo nome é obrigatório"),
    phone: yup
      .string()
      .max(
        11,
        "o campo telefone não pode ter mais de 11 carcteres (DD996######"
      )
      .required("o campo telefone é obrigatório"),
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
      .max(20, "o campo número não pode ter mais de 20 caracteres")
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactRequest>({ resolver: yupResolver(schema) });

  const onRegister = async (data: IContactRequest) => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };

    const load = toast.loading("Enviando...", {
      ...options,
      icon: <LoadingIcons.Puff stroke="black" />,
    });

    try {
      await Api.post("/contacts/", data, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        toast.update(load, {
          ...options,
          isLoading: false,
          render: "Cadastrado com sucesso!",
          icon: <CheckCircleIcon width={20} color="green" />,
          type: "success",
        });
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.update(load, {
          ...options,
          isLoading: false,
          render: error.response.data.message,
          icon: <XCircleIcon width={20} color="white" />,
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <InputCommon
            id="name"
            register={register}
            text="Nome"
            type="text"
            placeholder="John Doe"
          />
          <span>{errors.name?.message}</span>
        </div>
        <div>
          <InputCommon
            id="phone"
            register={register}
            text="Telefone"
            type="text"
            placeholder="exemplo@mail.com"
          />
          <span>{errors.phone?.message}</span>
        </div>
        <div>
          <InputCommon
            id="address"
            register={register}
            text="Endereço"
            type="text"
            placeholder="R. exemplo"
          />
          <span>{errors.address?.message}</span>
        </div>
        <div>
          <InputCommon
            id="city"
            register={register}
            text="Cidade"
            type="text"
            placeholder="Cidade Exemplo"
          />
        </div>
        <div>
          <InputCommon
            id="cep"
            register={register}
            text="Cep"
            type="text"
            placeholder="00000-000"
          />
        </div>
      </form>
    </div>
  );
};

export default ModalCadastrar;
