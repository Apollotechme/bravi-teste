import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../Button";
import Formulary from "../Formulary";
import { AuthContext } from "../../context/AuthContext";
import { SwitchContext } from "../../context/SwitchContext";

const RemoveContact = () => {
  const { focus, removeTech } = useContext(AuthContext);
  const { modalSwitcher } = useContext(SwitchContext);

  return (
    <Formulary
      onSubmit={(event) => {
        event.preventDefault();
        removeTech();
        modalSwitcher("remove_tech");
      }}
    >
      <header>
        <h3>Remover Tecnologia</h3>
        <AiOutlineClose onClick={() => modalSwitcher("remove_tech")} />
      </header>
      <h3>Tem certeza que deseja remover "{focus.name}" de seus contatos?</h3>
      <div className="double__buttons">
        <Button buttonStyle="primary" submit>
          Sim
        </Button>
        <Button
          buttonStyle="primary"
          handler={() => modalSwitcher("remove_tech")}
        >
          Não
        </Button>
      </div>
    </Formulary>
  );
};

export default RemoveContact;
