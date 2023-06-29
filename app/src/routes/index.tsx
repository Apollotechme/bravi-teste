import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import { useEffect, useState } from "react";
import DashboardPage from "../pages/dashboard";

const RoutesFunction = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@BraviToken");

    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<DashboardPage auth={authenticated} />}
      />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default RoutesFunction;
