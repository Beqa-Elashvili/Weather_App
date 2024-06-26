import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts";
import VideoBackground from "./Components/VideoBackground/VideoBackground";

const Home = lazy(() => import("@src/views/Home"));
const Weather = lazy(() => import("@src/views/Weather"));
const SearchResults = lazy(() => import("@src/views/SearchResults"));

function App() {
  return (
    <div>
      <VideoBackground>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Weather/:City" element={<Weather />} />
            <Route
              path="/Weather/Search&results=/:City"
              element={<SearchResults />}
            />
          </Route>
        </Routes>
      </VideoBackground>
    </div>
  );
}

export default App;
