import { isAuthenticated } from "@/utils/auth";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export { PublicRoute, ProtectedRoute };