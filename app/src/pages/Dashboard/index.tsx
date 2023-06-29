import { useContext } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

import Button from "../../components/Button";
import PrivateContent from "../../components/PrivateContent";
import { AuthContext } from "../../context/AuthContext";
import { SwitchContext } from "../../context/SwitchContext";
import { IContact } from "../../types/typeAuthContext";
import "./style.scss";

const Dashboard = () => {
  const { contacts } = useContext(AuthContext);
  const { modalSwitcher } = useContext(SwitchContext);

  return (
    <PrivateContent>
      <main className="main-styled">
        <section className="content__tech">
          <h3>Lista de Contatos</h3>
          <Button handler={() => modalSwitcher("create_tech")}>
            <BsPlusLg />
          </Button>
        </section>
        <ul className="content__list">
          {contacts.length > 0 ? (
            contacts.map((contact) => {
              return (
                <li className="list__skill" key={contact.contact_id}>
                  <h4>{contact.name}</h4>
                  <div className="skill__details">
                    <span>{contact.phone}</span>
                    <span>
                      {contact.description &&
                        `Descrição: ${contact.description}`}
                    </span>
                    <span>{contact.address && `Rua ${contact.address}`}</span>
                    <span>{contact.number && `Número: ${contact.number}`}</span>
                    <span>
                      {contact.complement &&
                        `Complemento: ${contact.complement}`}
                    </span>
                    <span>
                      {contact.district && `Bairro: ${contact.district}`}
                    </span>
                    <span>{contact.city && `Cidade: ${contact.city}`}</span>
                    <span>{contact.state && `Estado: ${contact.state}`}</span>
                    <button
                      onClick={() => modalSwitcher("update_tech", contact)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => modalSwitcher("remove_tech", contact)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="list__empty">
              <h3>Parece que sua lista de contatos está vazia...</h3>
              <button
                onClick={() => modalSwitcher("create_tech", {} as IContact)}
              >
                Adicionar contatos
              </button>
            </li>
          )}
        </ul>
      </main>
    </PrivateContent>
  );
};

export default Dashboard;
