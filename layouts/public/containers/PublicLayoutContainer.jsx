import React from "react";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

const PublicLayoutContainer = ({ children }) => {
  return (
    <div>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayoutContainer;