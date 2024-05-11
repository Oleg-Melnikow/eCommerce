import { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "./router";

import "react-toastify/dist/ReactToastify.css";

function App(): ReactElement {
  const content = useRoutes(routes);
  return (
    <div className="App">
      <ToastContainer />
      {content}
    </div>
  );
}

export default App;
