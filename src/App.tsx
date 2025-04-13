import { Toaster } from 'sonner'
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Dashboard from "./pages/Dashboard";
import CriteriaSelection from "./pages/CriteriaSelection";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import { ProtectedRoute, PublicRoute } from './components/auth/RouteGuard';

const App = () => (
    <TooltipProvider>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/email-confirmation" element={<PublicRoute><EmailConfirmation /></PublicRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/select-criteria" element={<ProtectedRoute><CriteriaSelection /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Results /></ProtectedRoute>} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
);

export default App;
