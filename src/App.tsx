import { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function App(): ReactElement {
  const content = useRoutes(routes);
  return <div className="App">{content}</div>;
}

export default App;
