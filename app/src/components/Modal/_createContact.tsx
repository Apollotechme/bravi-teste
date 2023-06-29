import { useContext } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../Button";
import CustomInput from "../Input";
import Formulary from "../Formulary";

import { IContactRequest, IUser } from "../../types/typeAuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import { AuthContext } from "../../context/AuthContext";
import { SwitchContext } from "../../context/SwitchContext";
import registerConcactSchema from "../../validators/createContact";
import { Api } from "../../services/api";
import { AxiosError } from "axios";

const CreateContact = () => {
  const token = localStorage.getItem("@BraviToken");
  const { updateToast, loadPattern } = useContext(NotificationContext);
  const { setUser } = useContext(AuthContext);

  const { modalSwitcher } = useContext(SwitchContext);
  // prettier-ignore
  const { register, handleSubmit, formState: { errors } } = useForm<IContactRequest>({
        resolver: yupResolver(registerConcactSchema),
      });

  const addContact: SubmitHandler<IContactRequest> = async (data) => {
    const load = toast.loading(...loadPattern);
    console.log("OLHA O TOKEN", { token });
    try {
      await Api.post("/v1/contacts", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateToast(load, `Contato adicionado a sua lista`, "success");
      modalSwitcher("create_tech");
    } catch (error) {
      if (error instanceof AxiosError) {
        updateToast(load, `${error.response.data.message}`, "warning");
      }
    }
    const { data: userData } = await Api.get<IUser>("/v1/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("OLHA O TOKEN", { token });
    setUser(userData);
  };
  return (
    <Formulary onSubmit={handleSubmit(addContact)}>
      <header>
        <h3>Cadastrar Contato</h3>
        <AiOutlineClose onClick={() => modalSwitcher("create_tech")} />
      </header>
      <CustomInput
        id="name"
        label="Nome *"
        placeholder="Nome"
        register={register}
        error={errors?.name?.message}
      />
      <CustomInput
        id="phone"
        label="Telefone *"
        register={register}
        error={errors?.phone?.message}
      />
      <CustomInput
        id="address"
        label="Endereço"
        placeholder="R. Exemplo"
        register={register}
        error={errors.address?.message}
      />

      <CustomInput
        id="number"
        label="Número"
        placeholder="N. 582"
        register={register}
        error={errors?.number?.message}
      />

      <CustomInput
        id="complement"
        label="Complemento"
        placeholder="Casa"
        register={register}
        error={errors?.complement?.message}
      />

      <CustomInput
        id="district"
        label="Bairro"
        placeholder="Bairro"
        register={register}
        error={errors?.district?.message}
      />

      <CustomInput
        id="city"
        label="Cidade"
        placeholder="Hollywood"
        register={register}
        error={errors?.city?.message}
      />

      <CustomInput
        id="state"
        label="Estado"
        placeholder="Califórnia"
        register={register}
        error={errors?.state?.message}
      />

      <CustomInput
        id="description"
        label="Descrição"
        placeholder="Anotações sobre o contato"
        register={register}
        error={errors?.description?.message}
      />

      <Button submit buttonStyle="primary">
        Cadastrar Contato
      </Button>
    </Formulary>
  );
};

export default CreateContact;
