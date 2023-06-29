import { useContext } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IGeneralProps } from "../../types/typeComponents";
import { SwitchContext } from "../../context/SwitchContext";

import "./style.scss";

const Tooltip = ({ children }: IGeneralProps) => {
  const { isOpened } = useContext(SwitchContext);
  return (
    <div className="errorTooltip">
      <BiErrorCircle />
      <p className={isOpened.modal_window ? "modal-tooltip" : "tooltip"}>
        {children}
      </p>
    </div>
  );
};

export default Tooltip;
