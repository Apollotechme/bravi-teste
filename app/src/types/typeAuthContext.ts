import { DeepRequired, FieldErrorsImpl, FieldValues } from "react-hook-form";

export interface IRegisterRequest {
  name?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
  bio?: string;
  contact?: string;
  course_module?: string;
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>;
}
export interface IAuthProvider {
  user: IUser;
  contacts: IContact[];
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
  loading: boolean;
  // prettier-ignore
  register: ({ name, email, password,  phone  }: IRegisterRequest) => void;
  signIn: (data: ILoginRequest) => void;
  removeTech: () => Promise<void>;
  focus: IContact;
  setFocus: React.Dispatch<React.SetStateAction<IContact>>;
}

export interface IContact {
  contact_id: string;
  name: string;
  creation_dt: string;
  last_update: string;
  phone: string;
  address: null | string;
  city: null | string;
  district: null | string;
  state: null | string;
  number: null | string;
  complement: null | string;
  description: null | string;
  user_id: string;
}

export interface IContactRequest {
  name: string;
  phone: string;
  address: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  number: string | null;
  complement: string | null;
  description: string | null;
}

export interface IUser {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface IRegisterRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  password_confirm?: string;
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>;
}

export interface ILoginRequest {
  email?: string;
  password?: string;
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>;
}

export interface ILoginResponse {
  token: string;
}

export interface IStateType {
  from: { pathname: string };
}
