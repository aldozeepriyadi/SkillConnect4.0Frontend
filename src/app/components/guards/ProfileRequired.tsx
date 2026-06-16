import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useApp } from "../../context/AppContext";

interface ProfileRequiredProps {
  children: ReactNode;
}

export function ProfileRequired({ children }: ProfileRequiredProps) {
  const { state, hasCompletedProfile } = useApp();
  const location = useLocation();

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (state.loginType === "company") {
    return <Navigate to="/company/dashboard" replace />;
  }

  if (!hasCompletedProfile()) {
    return (
      <Navigate
        to="/profile"
        replace
        state={{
          from: location.pathname,
          profileRequiredMessage:
            "Lengkapi profil terlebih dahulu sebelum mengakses rekomendasi kerja, skill gap, screening, dan rekomendasi pelatihan.",
        }}
      />
    );
  }

  return <>{children}</>;
}
