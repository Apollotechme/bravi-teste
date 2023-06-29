import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Formulary from "../../components/Formulary";
import CustomInput from "../../components/Input";
import Button from "../../components/Button";
import { ISessionRequest } from "../../types/typeComponents";
import loginSchema from "../../validators/login";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISessionRequest>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <Formulary onSubmit={handleSubmit(signIn)}>
        <h1 className="login__header">Bravi Contacts</h1>
        <h3>Login</h3>
        <CustomInput
          id="email"
          label="Email"
          type="email"
          placeholder="Insira seu email"
          register={register}
          error={errors?.email?.message}
        />
        <CustomInput
          id="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          register={register}
          error={errors?.password?.message}
        />

        <Button submit buttonStyle="primary">
          Entrar
        </Button>
        <span>Ainda não possui uma conta?</span>
        <Button handler={() => navigate("/register")} buttonStyle="secondary">
          Cadastre-se
        </Button>
      </Formulary>
    </>
  );
};

export default Login;
