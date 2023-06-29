import { Api } from "../services/api";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form";
//  prettier-ignore
import { createContext, useState, useContext, useEffect } from "react";

import { NotificationContext } from "./NotificationContext";
import { useLocation, useNavigate } from "react-router-dom";
import SwitchProvider from "./SwitchContext";
import { IGeneralProps } from "../types/typeComponents";
//  prettier-ignore
import { IAuthProvider, IStateType, IContact, IUser, ILoginRequest, IRegisterRequest, ILoginResponse } from "../types/typeAuthContext";
import { AxiosError } from "axios";

export const AuthContext = createContext<IAuthProvider>({} as IAuthProvider);

const AuthProvider = ({ children }: IGeneralProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [focus, setFocus] = useState<IContact>({} as IContact);
  const [loading, setLoading] = useState(true);

  const { updateToast, loadPattern } = useContext(NotificationContext);
  const { state } = useLocation();
  const stateType = state as IStateType;
  const navigate = useNavigate();

  const signIn: SubmitHandler<ILoginRequest> = async (data) => {
    const load = toast.loading(...loadPattern);
    const response = await Api.post<ILoginResponse>("v1/session/", data).catch(
      () => updateToast(load, "Email ou senha inválidos", "error")
    );

    if (response) {
      const { token } = response.data;

      localStorage.setItem("@BraviToken", token);
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userData = await Api.get("/v1/user/", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.data);
      setUser(userData);
      updateToast(load, `Bem vindo !`, "success");

      const contacts = await Api.get("/v1/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.data);
      setContacts(contacts);

      const navigatePath = stateType?.from?.pathname || "/dashboard";
      navigate(navigatePath, { replace: true });
    }
  };

  const register: SubmitHandler<IRegisterRequest> = async ({
    name,
    email,
    password,
    phone,
  }) => {
    const options = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };

    const load = toast.loading(...loadPattern);
    try {
      const response = await Api.post("/v1/user", options);
      updateToast(load, "Conta criada com sucesso", "success");
      if (response.status < 400) {
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        updateToast(load, error.response.data.message, "error");
      }
    }
  };

  const removeContact = async () => {
    const load = toast.loading(...loadPattern);
    await Api.delete<void>(`/contact/${focus.contact_id}`).catch<void>(() =>
      toast.update(load)
    );
    const token = localStorage.getItem("@BraviToken");
    const { data } = await Api.get<IContact[]>("/v1/contact/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setContacts(data);
    data && updateToast(load, "Contato excluído da sua lista", "success");
  };

  useEffect(() => {
    const loadAuth = async () => {
      const token = localStorage.getItem("@BraviToken");

      if (token) {
        try {
          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await Api.get<IUser>("v1/user/");

          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };
    loadAuth();
  }, []);

  return (
    <AuthContext.Provider
      //  prettier-ignore
      value={{ user, setUser, loading, register, signIn, removeTech: removeContact, focus, setFocus, contacts, setContacts }}
    >
      <SwitchProvider>{children}</SwitchProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
