import { ToastContainer } from "react-toastify";
import "./App.css";
import RoutesFunction from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <RoutesFunction />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        bodyClassName="rounded-lg"
        style={{ zIndex: 99999, width: "30rem" }}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        icon={false}
      />
    </div>
  );
}

export default App;
