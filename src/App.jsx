import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts";
import { Suspense } from "react";
import { Spin } from "antd";
import VideoBackground from "./Components/VideoBackground/VideoBackground";

const Home = lazy(() => import("@src/views/Home"));
const Weather = lazy(() => import("@src/views/Weather"));
const SearchResults = lazy(() => import("@src/views/SearchResults"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-2 mt-60 text-blue-900">
            <p className="text-3xl">Weather App</p>
            <Spin />
          </div>
        }
      >
        <VideoBackground>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/Weather/:City/:startDate/:endDate"
                element={<Weather />}
              />
              <Route
                path="/Weather/Search&results=/:City"
                element={<SearchResults />}
              />
            </Route>
          </Routes>
        </VideoBackground>
      </Suspense>
    </div>
  );
}

export default App;
