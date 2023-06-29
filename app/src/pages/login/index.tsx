import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastOptions, toast } from "react-toastify";
import LoadingIcons from "react-loading-icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { Api } from "../../services/api";
import InputCommon from "../../components/input";
import InputPassword from "../../components/inputPassword";
import Logo from "../../assets/Logo.png";

type ILoginUser = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
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
  });

  const onLogin = async (data: ILoginUser) => {
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
      await Api.post("/session/", data).then((res) => {
        toast.update(load, {
          ...options,
          isLoading: false,
          render: "Sucesso!",
          icon: <CheckCircleIcon width={20} color="green" />,
          type: "success",
        });

        localStorage.setItem("@BraviToken", res.data.token);

        navigate("/dashboard");
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>({ resolver: yupResolver(schema) });
  return (
    <div>
      <img src={Logo} alt="logomarca" />
      <div>
        <form onSubmit={handleSubmit(onLogin)}>
          <div>
            <InputCommon
              type="text"
              placeholder="exemplo@mail.com"
              register={register}
              id="email"
              text="E-mail"
            />
            <span>{errors.email?.message}</span>
          </div>
          <div>
            <InputPassword
              type="password"
              register={register}
              id="password"
              text="Senha"
            />
            <span>{errors.password?.message}</span>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
