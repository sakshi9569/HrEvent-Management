import React from "react";
import AppRoutes from "./navigation/AppRoutes";
import {PublicLayoutContainer as PublicLayout} from "./layouts/public/index.jsx";
import PrivateLayout from "./layouts/private";
import { useStoreContext } from "./contextApi/ContextApi";

const App = () => {
  const { token } = useStoreContext();  
  const Layout = token ? PrivateLayout : PublicLayout;
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;