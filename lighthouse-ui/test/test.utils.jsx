import { render } from "@testing-library/react";
import {
  MemoryRouter,
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

import App from "../src/App";

/**
 * Renders a React element with a router for testing purposes.
 *
 * @param {ReactElement} element - The React element to render.
 * @param {string} elementPath - The path for the element in the router.
 * @param {Object} params - The value of any parameters in the path.
 */
export const renderWithRouter = (element, elementPath, params) => {
  //Wraps element with div containing location data
  const PageNavigatedTo = ({ children }) => {
    const location = useLocation();
    return (
      <div data-testid="pageNavigatedTo" data-location={location.pathname}>
        {children}
      </div>
    );
  };

  //replace route path with param values for the initial path
  let initialPath = elementPath;
  if (params) {
    Object.keys(params).forEach((paramName) => {
      initialPath = initialPath.replace(`:${paramName}`, params[paramName]);
    });
  }

  const router = createMemoryRouter(
    [
      {
        path: elementPath,
        element: <PageNavigatedTo>{element}</PageNavigatedTo>,
      },
      { path: "*", element: <PageNavigatedTo /> },
    ],
    {
      initialEntries: [initialPath],
    }
  );

  render(<RouterProvider router={router} />);
};

/**
 * Renders the app wrapped with location data.
 *
 * @param {Array} initialEntries - The initial entries for the MemoryRouter.
 */
export const renderAppWithLocationWrapper = (initialEntries) => {
  const AppWrappedWithLocationData = () => {
    const location = useLocation();
    return (
      <div data-testid="current-location" data-location={location.pathname}>
        <App />
      </div>
    );
  };

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppWrappedWithLocationData />
    </MemoryRouter>
  );
};

/**
 * Creates a promise along with its resolver and rejecter.
 * @returns {Array} An array containing the promise, resolver, and rejecter.
 */
export const mockPromise = () => {
  let resolver;
  let rejecter;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  return [promise, resolver, rejecter];
};

/**
 * Sets up the environment for modal testing.
 */
export const setUpForModal = () => {
  Object.defineProperty(global.window, "scrollTo", {
    value: () => null,
  });
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
};

/**
 * Removes the modal element from the document body.
 */
export const cleanUpForModal = () => {
  document.body.removeChild(document.getElementById("modal"));
};
