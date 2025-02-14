import React from "react";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

const PublicLayoutContainer = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PublicHeader />
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "64px" }}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayoutContainer;