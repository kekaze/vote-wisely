
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Senate Matcher</h1>
            <p className="text-gray-600">
              Find the senatorial candidates that best match your political preferences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Link
              to="/preferences"
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-ph-blue/20 hover:shadow-md transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-ph-blue/5 rounded-full group-hover:bg-ph-blue/10 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-ph-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Select Preferences</h2>
                  <p className="text-gray-600">
                    Choose your stance on key political issues to find matching candidates.
                  </p>
                </div>
              </div>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 opacity-50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">View Past Results</h2>
                  <p className="text-gray-600">
                    Access your previous candidate matches and compare results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
