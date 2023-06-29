import { createContext } from "react";
//  prettier-ignore
import { Id, toast, ToastOptions, UpdateOptions } from "react-toastify";

import AuthProvider from "./AuthContext";
import ToastBox from "../components/ToastBox";
import { INotificationProvider } from "../types/typeNotificationContext";

import "react-toastify/dist/ReactToastify.css";
import { IGeneralProps } from "../types/typeComponents";

export const NotificationContext = createContext<INotificationProvider>(
  {} as INotificationProvider
);

const NotficationProvider = ({ children }: IGeneralProps) => {
  const baseSettings = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  } as ToastOptions;

  const updateToast = (loader: Id, message: string, toastType: string) => {
    const settings = {
      ...baseSettings,
      render: message,
      type: toastType,
      isLoading: false,
    } as UpdateOptions;

    toast.update(loader, settings);
  };

  const loadPattern = [
    "Solicitação em andamento...",
    baseSettings,
  ] as INotificationProvider["loadPattern"];

  return (
    <NotificationContext.Provider
      value={{ updateToast, loadPattern, baseSettings }}
    >
      <AuthProvider>
        {children}
        <ToastBox />
      </AuthProvider>
    </NotificationContext.Provider>
  );
};

export default NotficationProvider;
