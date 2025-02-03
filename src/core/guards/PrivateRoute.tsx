import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/AuthService";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  // Prevent authenticated users from accessing login/register when already logged in
  if (
    isAuthenticated &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  // Redirect unauthenticated users to login for protected routes
  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return (
      <Navigate
        to="/login"
        state={{
          returnUrl: location.pathname,
          from: location,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
