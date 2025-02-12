import React from "react";
import PrivateHeader from "../components/PrivateHeader";
import PrivateFooter from "../components/PrivateFooter";

const PrivateLayoutContainer = ({ children }) => {
  return (
    <div>
      <PrivateHeader />
      <div style={{ display: "flex" }}>
        <main>{children}</main>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default PrivateLayoutContainer;