import React from "react";
import { BrowserRouter } from "react-router-dom";  
import AppRoutes from "./navigation/AppRoutes";
import { useStoreContext } from "./contextApi/ContextApi";
import PublicLayoutContainer from "./layouts/public/containers/PublicLayoutContainer";
import PrivateLayoutContainer from "./layouts/private/containers/PrivateLayoutContainer";

const App = () => {
  const { token } = useStoreContext();
  const Layout = token ? PrivateLayoutContainer : PublicLayoutContainer;

  return (
    <BrowserRouter>  
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
