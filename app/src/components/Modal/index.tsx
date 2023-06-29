import { useContext } from "react";
import CreateContact from "./_createContact";
import RemoveContact from "./_deleteContact";
import UpdateContact from "./_updateContact";
import { SwitchContext } from "../../context/SwitchContext";
import "./style.scss";

const CustomModal = () => {
  const { isOpened } = useContext(SwitchContext);

  return (
    <div className="styled-modal">
      {isOpened.create_tech && <CreateContact />}
      {isOpened.remove_tech && <RemoveContact />}
      {isOpened.update_tech && <UpdateContact />}
    </div>
  );
};

export default CustomModal;
