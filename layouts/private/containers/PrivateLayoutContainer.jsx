import React from "react";
import PrivateHeader from "../components/PrivateHeader";
import PrivateFooter from "../components/PrivateFooter";

const PrivateLayoutContainer = ({ children }) => {
  const handleLogout = () => { 
  };

  return (
    <div>
      <PrivateHeader handleLogout={handleLogout} />
      <div style={{ display: "flex" }}>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default PrivateLayoutContainer;
