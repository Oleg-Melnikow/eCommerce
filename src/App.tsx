import { ReactElement } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuth from "hooks/use-auth";
import routes from "./router";
import "react-toastify/dist/ReactToastify.css";
import API from "./api/API";

function App(): ReactElement {
  const content = useRoutes(routes);
  API.getInstance(useNavigate(), useAuth());
  return (
    <div className="App">
      <ToastContainer className="toastContainer" />
      {content}
    </div>
  );
}

export default App;
