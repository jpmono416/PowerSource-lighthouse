import { Routes, Route, Outlet } from "react-router-dom";

import { LLMCatalogueContextProvider } from "../hooks/contexts/LLMCatalogueContext";
import Catalogue from "../components/catalogue/Catalogue";
import ModelView from "../components/modelView/ModelView";
import AddModalView from "../components/modelView/AddModelView";

export default function CatalogueRouter() {
  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/:modelId" element={<ModelView />} />
      <Route path="/catalogue/add" element={<AddModalView />} />
    </Routes>
  );
}
