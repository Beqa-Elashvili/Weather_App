import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts";

const Home = lazy(() => import("@src/views/Home"));
const Weather = lazy(() => import("@src/views/Weather"));

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Weather/:City" element={<Weather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
