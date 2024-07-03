import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Suspense } from "react";

export function PublicLayout() {
  return (
    <div>
      <>
        <Header />
        <Outlet />
      </>
    </div>
  );
}
