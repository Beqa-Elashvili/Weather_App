import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@src/views/Home"));

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
