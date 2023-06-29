import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Api } from "../../services/api";
import { ToastOptions, toast } from "react-toastify";
import LoadingIcons from "react-loading-icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type IRegisterUser = {
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
  name: string;
  birth_date: Date | null;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
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
      .max(
        11,
        "o campo telefone não pode ter mais de 11 carcteres (DD996######"
      )
      .required("o campo telefone é obrigatório"),
    birth_date: yup.date(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({ resolver: yupResolver(schema) });

  const onRegister = async (data: IRegisterUser) => {
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
      await Api.post("/user/", data).then(() => {
        toast.update(load, {
          ...options,
          isLoading: false,
          render: "Cadastrado com sucesso!",
          icon: <CheckCircleIcon width={20} color="green" />,
          type: "success",
        });

        navigate("/login");
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
      <form onSubmit={handleSubmit(onRegister)}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="text"
            placeholder="exemplo@mail.com"
            {...register("email")}
          />
          <span>{errors.email?.message}</span>
        </div>
        <div>
          <label htmlFor="">Nome</label>
          <input type="text" placeholder="John Doe" {...register("name")} />
          <span>{errors.name?.message}</span>
        </div>
        <div>
          <label htmlFor="">Telefone</label>
          <input type="text" {...register("phone")} />
          <span>{errors.phone?.message}</span>
        </div>
        <div>
          <label htmlFor="">Senha</label>
          <input type="password" {...register("password")} />
          <span>{errors.password?.message}</span>
        </div>
        <div>
          <label htmlFor="">Confirme senha</label>
          <input type="password" {...register("password_confirm")} />
          <span>{errors.password_confirm?.message}</span>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
