import { useEffect, useState } from "react";
import { Api } from "../../services/api";

type IDashboardTypes = {
  auth: boolean;
};
const DashboardPage = (props: IDashboardTypes) => {
  const [user, setUser] = useState();
  const [modalCad, setModalCad] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    Api.get("/users", {
      headers: { Authorization: `Bearer ${props.auth}` },
    });
  });

  return <div>TO DO</div>;
};

export default DashboardPage;
