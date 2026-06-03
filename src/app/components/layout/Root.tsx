import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";

const NO_NAVBAR_PATHS = ["/login", "/register", "/company/register", "/company/dashboard"];

export function Root() {
  const location = useLocation();
  const showNavbar = !NO_NAVBAR_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-16" : ""}>
        <Outlet />
      </main>
    </div>
  );
}