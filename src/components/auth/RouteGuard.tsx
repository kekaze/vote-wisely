import { useAuthStatus } from "@/hooks/use-auth-status";
import { Navigate } from "react-router-dom";

const LoadingSpinner = () => <div>Loading...</div>;

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStatus();
    if (isAuthenticated === null) {
        return <LoadingSpinner />;
    }
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStatus();
    if (isAuthenticated === null) {
        return <LoadingSpinner />;
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export { PublicRoute, ProtectedRoute };