import { FormHTMLAttributes, ReactNode } from "react";

export interface IButtonProps {
  buttonStyle?: string;
  children?: ReactNode;
  handler?: () => void;
  submit?: boolean;
}

export interface IFormulary extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
