import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts";

const Home = lazy(() => import("@src/views/Home"));

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
