import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useApp } from "../../context/AppContext";

interface LoginRequiredProps {
  children: ReactNode;
}

export function LoginRequired({ children }: LoginRequiredProps) {
  const { state } = useApp();
  const location = useLocation();

  if (!state.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          authRequiredMessage: "Silakan masuk terlebih dahulu sebelum melengkapi profil.",
        }}
      />
    );
  }

  if (state.loginType === "company") {
    return <Navigate to="/company/dashboard" replace />;
  }

  return <>{children}</>;
}
