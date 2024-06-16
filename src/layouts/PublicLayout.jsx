import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
