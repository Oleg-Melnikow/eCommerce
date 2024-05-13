import "./Layout.scss";
import React, { ReactElement, ReactNode } from "react";
import Header from "../_Header/_Header";

function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="layout__container">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
