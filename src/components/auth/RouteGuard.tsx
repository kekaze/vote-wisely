import { useAuthStatus } from "@/hooks/use-auth-status";
import { Navigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const LoadingSpinner = () => <div className="flex justify-center items-end min-h-[50vh]">Loading...</div>;

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
    return isAuthenticated ? (
        <>
            <LogoutButton />
            {children}
        </>
    ) : <Navigate to="/login" replace />;
};

export { PublicRoute, ProtectedRoute };