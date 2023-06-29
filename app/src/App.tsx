import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import NotficationProvider from "./context/NotificationContext";
import AppRoutes from "./routes";

function App() {
  return (
    <div id="base-container">
      <NotficationProvider>
        <AppRoutes />
      </NotficationProvider>
    </div>
  );
}

export default App;
