import { Routes, Route } from "react-router-dom";

import Catalogue from "../components/catalogue/Catalogue";
import ModelDetailsView from "../components/modelView/modelDetailsView/ModelDetailsView";
import AddModalView from "../components/modelView/AddModelView";

export default function CatalogueRouter() {
  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/:modelId" element={<ModelDetailsView />} />
      <Route path="/catalogue/add" element={<AddModalView />} />
    </Routes>
  );
}
