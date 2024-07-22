import { Routes, Route, Outlet } from "react-router-dom";

import { LLMCatalogueContextProvider } from "../hooks/contexts/LLMCatalogueContext";
import Catalogue from "../components/catalogue/Catalogue";
import ModelView from "../components/modelView/ModelView";

export default function CatalogueRouter() {
  return (
    <Routes>
      <Route
        element={
          <LLMCatalogueContextProvider>
            <Outlet />
          </LLMCatalogueContextProvider>
        }
      >
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/catalogue/:modelId" element={<ModelView />} />
      </Route>
    </Routes>
  );
}
