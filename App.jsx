import React from "react";
import AppRoutes from "./navigation/AppRoutes";
import PublicLayout from "./layouts/public"; 
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