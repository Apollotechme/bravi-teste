import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../Button";
import CustomInput from "../Input";

import Formulary from "../Formulary";

import { toast } from "react-toastify";
import { SwitchContext } from "../../context/SwitchContext";
import { NotificationContext } from "../../context/NotificationContext";
import { IUpdateContact } from "../../types/typeComponents";
import { Api } from "../../services/api";
import { IContact } from "../../types/typeAuthContext";
import { AuthContext } from "../../context/AuthContext";

const UpdateContact = () => {
  const { modalSwitcher } = useContext(SwitchContext);
  const { focus } = useContext(AuthContext);
  const { updateToast, loadPattern } = useContext(NotificationContext);

  const update: SubmitHandler<IUpdateContact> = async (data) => {
    console.log({ data });

    const load = toast.loading(...loadPattern);
    await Api.patch(`/v1/contacts/`, data).catch(() =>
      updateToast(load, "Opa, parece que algo quebrou", "error")
    );
    updateToast(load, "Contato alterado com sucesso", "success");
    modalSwitcher("update_tech", {} as IContact);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateContact>({
    defaultValues: { contact_id: focus.contact_id },
  });
  return (
    <Formulary onSubmit={handleSubmit(update)}>
      <header>
        <h3>Editar Contato</h3>
        <AiOutlineClose
          onClick={() => modalSwitcher("update_tech", {} as IContact)}
        />
      </header>
      <h3>Alteração de status</h3>
      <CustomInput
        id="name"
        label="Nome *"
        placeholder="Nome"
        defaultValue={focus.name}
        register={register}
        error={errors?.name?.message}
      />
      <CustomInput
        id="phone"
        label="Telefone *"
        register={register}
        defaultValue={focus.phone}
        error={errors?.phone?.message}
      />
      <CustomInput
        id="address"
        label="Endereço"
        placeholder="R. Exemplo"
        defaultValue={focus.address}
        register={register}
        error={errors.address?.message}
      />

      <CustomInput
        id="number"
        label="Número"
        placeholder="N. 582"
        defaultValue={focus.number}
        register={register}
        error={errors?.number?.message}
      />

      <CustomInput
        id="complement"
        label="Complemento"
        placeholder="Casa"
        defaultValue={focus.complement}
        register={register}
        error={errors?.complement?.message}
      />

      <CustomInput
        id="district"
        label="Bairro"
        placeholder="Bairro"
        defaultValue={focus.district}
        register={register}
        error={errors?.district?.message}
      />

      <CustomInput
        id="city"
        label="Cidade"
        placeholder="Hollywood"
        defaultValue={focus.city}
        register={register}
        error={errors?.city?.message}
      />

      <CustomInput
        id="state"
        label="Estado"
        placeholder="Califórnia"
        defaultValue={focus.state}
        register={register}
        error={errors?.state?.message}
      />

      <CustomInput
        id="description"
        label="Descrição"
        placeholder="Anotações sobre o contato"
        defaultValue={focus.description}
        register={register}
        error={errors?.description?.message}
      />
      <div className="double__buttons">
        <Button buttonStyle="primary" submit>
          Atualizar
        </Button>
        <Button
          buttonStyle="primary"
          handler={() => modalSwitcher("update_tech", {} as IContact)}
        >
          Voltar
        </Button>
      </div>
    </Formulary>
  );
};

export default UpdateContact;
