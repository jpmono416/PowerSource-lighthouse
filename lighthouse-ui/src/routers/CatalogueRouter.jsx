import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";

import Catalogue from "../components/catalogue/Catalogue";
import ModelDetailsView from "../components/modelView/modelDetailsView/ModelDetailsView";
import AddModalView from "../components/modelView/AddModelView";
import { useAppContext } from "../hooks/contexts/AppContext";
import EditModalView from "../components/modelView/EditModalView";

export default function CatalogueRouter() {
  const { isAdmin } = useAppContext();

  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/:modelId" element={<ModelDetailsView />} />
      {isAdmin && (
        <>
          <Route path="/catalogue/add" element={<AddModalView />} />
          <Route path="/catalogue/:modelId/edit" element={<EditModalView />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
