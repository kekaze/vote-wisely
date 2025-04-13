import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Criteria {
  title: string;
  description: string;
}

interface Platform {
  title: string;
  description: string;
}

interface SelectedCriteria {
  in_favor: string[];
  against: string[];
  platforms: string[];
}

const preferences: Criteria[] = [
  {
    title: "Against Contractualization",
    description: "Support ending the practice of contractualization in employment",
  },
  {
    title: "POGO Ban",
    description: "Support banning Philippine Offshore Gaming Operators",
  },
  {
    title: "Death Penalty",
    description: "Support reinstating capital punishment",
  },
  {
    title: "Divorce Law",
    description: "Support legalizing divorce in the Philippines",
  },
  {
    title: "Same-Sex Marriage",
    description: "Support legalizing same-sex marriage",
  },
  {
    title: "Anti-Dynasty Law",
    description: "Support limiting political dynasties",
  },
  {
    title: "Federalism",
    description: "Support shifting to a federal form of government",
  },
  {
    title: "Nuclear Energy",
    description: "Support developing nuclear energy in the Philippines",
  },
];

const platforms: Platform[] = [
  {
    title: "Free Education",
    description: "Support for free education at all levels",
  },
  {
    title: "Universal Healthcare",
    description: "Support for comprehensive healthcare coverage for all citizens",
  },
  {
    title: "Infrastructure Development",
    description: "Focus on improving transportation and public works",
  },
  {
    title: "Job Creation",
    description: "Policies focused on creating employment opportunities",
  },
  {
    title: "Environmental Protection",
    description: "Strong environmental policies and climate action",
  },
  {
    title: "Digital Transformation",
    description: "Modernization of government services and digital infrastructure",
  }
];

const CriteriaSelection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<SelectedCriteria>({
    in_favor: [],
    against: [],
    platforms: []
  });

  const togglePreference = (title: string, category: keyof SelectedCriteria) => {
    setSelectedPreferences((prev) => {
      const criteria = { ...prev };
      
      if (category === "in_favor" || category === "against") {
        const otherCategory = category === "in_favor" ? "against" : "in_favor";
        criteria[otherCategory] = criteria[otherCategory].filter(p => p !== title);
      }
      
      criteria[category] = criteria[category].includes(title)
        ? criteria[category].filter((p) => p !== title)
        : [...criteria[category], title];
      
      return criteria;
    });
  };

  const handleSubmit = () => {
    const totalSelected = Object.values(selectedPreferences).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    
    if (totalSelected < 3) {
      toast.error("Please select at least 3 preferences");
      return;
    }
    
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(selectedPreferences)
    };

    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/EmbeddingSearch/similarity-search`, requestOptions)
      .then(async response => {
        if(!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        setIsLoading(false);
        navigate("/results", { state: { preferences: selectedPreferences } });
      })
      .catch (error => {
        setIsLoading(false);
        toast.error(`Failed to process your request: ${error.message}`);
        return;
      })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Preferences</h1>
            <p className="text-gray-600">
              Choose your political stances and preferred platforms.
            </p>
          </div>

          {/* Political Stances Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Political Stances</h2>
            <p className="text-gray-600 mb-4">Select your position on these political issues.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {preferences.map((preference, index) => (
                <div
                  key={`criteria-${index}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{preference.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{preference.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => togglePreference(preference.title, "in_favor")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedPreferences.in_favor.includes(preference.title)
                          ? "bg-ph-blue text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-ph-blue/10"
                      }`}
                    >
                      In Favor
                    </button>
                    <button
                      onClick={() => togglePreference(preference.title, "against")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedPreferences.against.includes(preference.title)
                          ? "bg-ph-red text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-ph-red/10"
                      }`}
                    >
                      Against
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Platforms</h2>
            <p className="text-gray-600 mb-4">Select the platforms that matter most to you.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((platform, index) => (
                <div
                  key={`platform-${index}`}
                  className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer transition-all ${
                    selectedPreferences.platforms.includes(platform.title)
                      ? "border-ph-blue ring-1 ring-ph-blue/20"
                      : "border-gray-100 hover:border-ph-blue/20"
                  }`}
                  onClick={() => togglePreference(platform.title, "platforms")}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 transition-colors ${
                        selectedPreferences.platforms.includes(platform.title)
                          ? "bg-ph-blue border-ph-blue"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPreferences.platforms.includes(platform.title) && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{platform.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center bg-ph-blue text-white px-6 py-2 rounded-md hover:bg-ph-blue/90 focus:outline-none focus:ring-2 focus:ring-ph-blue/20 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Finding matches...
                </>
              ) : (
                <>
                  Find Matching Candidates
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaSelection;
