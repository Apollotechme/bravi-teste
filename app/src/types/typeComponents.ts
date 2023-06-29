import { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface IButtonProps {
  buttonStyle?: string;
  children?: ReactNode;
  handler?: () => void;
  submit?: boolean;
}

export interface IFormulary extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: Function;
  error?: string;
  select?: boolean;
}

export interface IGeneralProps {
  children: ReactNode;
}

export interface IUpdateContact {
  contact_id: string;
  address?: string | null;
  city?: string | null;
  complement?: string | null;
  description?: string | null;
  district?: string | null;
  name?: string | null;
  number?: string | null;
  phone?: string | null;
  state?: string | null;
}

export interface IUserRequest {
  name: string;
  password: string;
  password_confirm: string;
  phone: string;
  email: string;
}

export interface ISessionRequest {
  email: string;
  password: string;
}
