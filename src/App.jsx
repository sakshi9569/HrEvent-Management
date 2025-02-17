import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";  
import AppRoutes from "./navigation/AppRoutes";
import { useStoreContext } from "./contextApi/ContextApi";


const PublicLayoutContainer = lazy(() => import("./layouts/public/containers/PublicLayoutContainer"));
const PrivateLayoutContainer = lazy(() => import("./layouts/private/containers/PrivateLayoutContainer"));

const App = () => {
  const { token } = useStoreContext();
  const Layout = token ? PrivateLayoutContainer : PublicLayoutContainer;

  return (
    <BrowserRouter>  
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <AppRoutes />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
