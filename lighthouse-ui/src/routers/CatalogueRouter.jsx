import { Routes, Route } from "react-router-dom";

import Catalogue from "../components/catalogue/Catalogue";
import ModelView from "../components/modelView/ModelView";

export default function CatalogueRouter() {
  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/:modelId" element={<ModelView />} />
    </Routes>
  );
}
