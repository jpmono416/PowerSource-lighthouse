import Header from "./components/header/Header";
import Home from "./components/home/Home";
import LighthouseRouter from "./router/LighthouseRouter";

function App() {
  return (
    <div className="min-h-[100vh] grid grid-rows-[auto_1fr]">
      <Header />
      <LighthouseRouter />
    </div>
  );
}

export default App;
