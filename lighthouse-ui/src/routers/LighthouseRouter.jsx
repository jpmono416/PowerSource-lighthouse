import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Catalogue from "../components/catalogue/Catalogue";
import Compare from "../components/compare/Compare";
import TabbedRoutes from "../components/library/TabbedRoutes";
import CatalogueRouter from "./CatalogueRouter";

const modelPaths = [
  {
    pathname: "/models/catalogue",
    label: "Catalogue",
    element: <CatalogueRouter />,
  },
  { pathname: "/models/compare", label: "Compare", element: <Compare /> },
];

export default function LighthouseRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models/*" element={<TabbedRoutes paths={modelPaths} />} />
    </Routes>
  );
}
