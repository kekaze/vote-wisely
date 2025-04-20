import { useState } from "react";
import { Mail, Phone } from "lucide-react";

interface AuthTabsProps {
  onTabChange: (tab: "email" | "phone") => void;
}

const AuthTabs = ({ onTabChange }: AuthTabsProps) => {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const handleTabChange = (tab: "email" | "phone") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => handleTabChange("email")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "email"
              ? "bg-white text-ph-blue shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Mail className="h-5 w-5" />
          <span>Email</span>
        </button>
        <button
          onClick={() => handleTabChange("phone")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "phone"
              ? "bg-white text-ph-blue shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Phone className="h-5 w-5" />
          <span>Phone</span>
        </button>
      </div>
    </div>
  );
};

export default AuthTabs; 