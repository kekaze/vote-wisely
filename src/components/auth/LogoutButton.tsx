import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/Auth/SignOut`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 p-3 rounded-full bg-red-500 shadow-md hover:shadow-lg hover:bg-red-600 transition-all duration-200"
      title="Logout"
    >
      <LogOut className="h-6 w-6 text-white" />
    </button>
  );
};

export default LogoutButton; 