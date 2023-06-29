import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { IGeneralProps } from "../../types/typeComponents";
import Button from "../Button";
import "./style.scss";
import { NotificationContext } from "../../context/NotificationContext";
import { AuthContext } from "../../context/AuthContext";

const PrivateContent = ({ children }: IGeneralProps) => {
  const { baseSettings } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    toast.info("Você foi desconectado", baseSettings);
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="private-container">
      <header>
        <nav className="nav-styled">
          <h1>Bravi Contacts</h1>
          <Button handler={logout}>Sair</Button>
        </nav>
        <section className="section-styled">
          <h2>Olá, {user.name}</h2>
          <span>{user.phone}</span>
        </section>
      </header>
      {children}
    </div>
  );
};

export default PrivateContent;
