import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/Button";
import CustomInput from "../../components/Input";
import Formulary from "../../components/Formulary";
import { AuthContext } from "../../context/AuthContext";
import createUserSchema from "../../validators/createUser";
import { IUserRequest } from "../../types/typeComponents";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({
    resolver: yupResolver(createUserSchema),
  });

  return (
    <>
      <Formulary onSubmit={handleSubmit(registerUser)}>
        <h1 className="login__header">Bravi Contacts</h1>
        <h3>Crie sua conta</h3>
        <span>Rápido e grátis, vamos nessa</span>

        <CustomInput
          id="name"
          label="Nome"
          placeholder="Digite aqui seu nome"
          register={register}
          error={errors?.name?.message}
        />
        <CustomInput
          id="email"
          label="Email"
          placeholder="Digite aqui seu email"
          register={register}
          error={errors?.email?.message}
        />
        <CustomInput
          id="password"
          type="password"
          label="Senha"
          placeholder="Digite aqui sua senha"
          register={register}
          error={errors?.password?.message}
        />
        <CustomInput
          id="password_confirm"
          type="password"
          label="Confirmar senha"
          placeholder="Digite novamente sua senha"
          register={register}
          error={errors?.password_confirm?.message}
        />
        <CustomInput
          id="phone"
          label="Contato"
          type="phone"
          placeholder="(00) 00000-0000"
          register={register}
          error={errors?.phone?.message}
        />

        <Button submit buttonStyle="primary">
          Cadastrar
        </Button>
        <Button handler={() => navigate("/login")}>Voltar</Button>
      </Formulary>
    </>
  );
};

export default Register;
