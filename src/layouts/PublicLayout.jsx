import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Suspense } from "react";

export function PublicLayout() {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <Outlet />
      </Suspense>
    </div>
  );
}
