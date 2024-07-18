import { ToastContainer } from "react-toastify";

import { AppContextProvider } from "./hooks/contexts/AppContext";
import Header from "./components/header/Header";
import LighthouseRouter from "./routers/LighthouseRouter";

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-[100vh] grid grid-rows-[auto_1fr]">
        <Header />
        <LighthouseRouter />
      </div>
      <ToastContainer
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        autoClose={3500}
        position="bottom-right"
      />
    </AppContextProvider>
  );
}

export default App;
