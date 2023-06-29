import { IContact } from "./typeAuthContext";

export interface IModalOpener {
  modal_window: boolean;
  create_tech: boolean;
  update_tech: boolean;
  remove_tech: boolean;
  create_work: boolean;
  update_work: boolean;
  remove_work: boolean;
}

export interface ISwitchProvider {
  isOpened: IModalOpener;
  modalSwitcher: (type: keyof IModalOpener, focused?: IContact) => void;
}
