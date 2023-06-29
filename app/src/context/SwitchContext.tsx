import { useContext, useState } from "react";
import { createContext } from "react";
import CustomModal from "../components/Modal";
import { IContact } from "../types/typeAuthContext";
import { IGeneralProps } from "../types/typeComponents";
import { IModalOpener, ISwitchProvider } from "../types/typeSwitchContext";
import { AuthContext } from "./AuthContext";

export const SwitchContext = createContext<ISwitchProvider>(
  {} as ISwitchProvider
);

const SwitchProvider = ({ children }: IGeneralProps) => {
  const [isOpened, setIsOpened] = useState<IModalOpener>({
    modal_window: false,
    create_tech: false,
    update_tech: false,
    remove_tech: false,
    create_work: false,
    update_work: false,
    remove_work: false,
  });

  const { focus, setFocus } = useContext(AuthContext);

  const modalSwitcher = (type: keyof IModalOpener, focused?: IContact) => {
    let backup = isOpened;
    backup.modal_window = !backup.modal_window;
    backup[type] = !backup[type];

    setIsOpened({ ...backup });
    setFocus(focused ? focused : focus);
  };

  return (
    <SwitchContext.Provider value={{ isOpened, modalSwitcher }}>
      {children}
      {isOpened.modal_window && <CustomModal />}
    </SwitchContext.Provider>
  );
};

export default SwitchProvider;
