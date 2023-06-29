import { Id, ToastContent, ToastOptions } from "react-toastify";

export interface INotificationProvider {
  updateToast: (loader: Id, message: string, toastType: string) => void;
  loadPattern: [ToastContent, ToastOptions];
  baseSettings: ToastOptions;
}
