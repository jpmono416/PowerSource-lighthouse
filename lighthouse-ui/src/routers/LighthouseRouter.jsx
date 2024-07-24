import { Routes, Route, Outlet } from "react-router-dom";

import Home from "../components/home/Home";
import Compare from "../components/compare/Compare";
import TabbedRoutes from "../components/library/TabbedRoutes";
import CatalogueRouter from "./CatalogueRouter";
import { LLMCatalogueContextProvider } from "../hooks/contexts/LLMCatalogueContext";
import RequireLoggedIn from "../components/library/RequireLoggedIn";

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
      <Route
        element={
          <LLMCatalogueContextProvider>
            <Outlet />
          </LLMCatalogueContextProvider>
        }
      >
        <Route
          path="/models/*"
          element={
            <RequireLoggedIn>
              <TabbedRoutes paths={modelPaths} />
            </RequireLoggedIn>
          }
        />
      </Route>
    </Routes>
  );
}
