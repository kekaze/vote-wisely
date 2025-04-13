
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Preference {
  id: string;
  title: string;
  description: string;
}

const preferences: Preference[] = [
  {
    id: "anti-contractualization",
    title: "Against Contractualization",
    description: "Support ending the practice of contractualization in employment",
  },
  {
    id: "pogo-ban",
    title: "POGO Ban",
    description: "Support banning Philippine Offshore Gaming Operators",
  },
  {
    id: "death-penalty",
    title: "Death Penalty",
    description: "Support reinstating capital punishment",
  },
  {
    id: "divorce-law",
    title: "Divorce Law",
    description: "Support legalizing divorce in the Philippines",
  },
  {
    id: "same-sex-marriage",
    title: "Same-Sex Marriage",
    description: "Support legalizing same-sex marriage",
  },
  {
    id: "anti-dynasty",
    title: "Anti-Dynasty Law",
    description: "Support limiting political dynasties",
  },
  {
    id: "federalism",
    title: "Federalism",
    description: "Support shifting to a federal form of government",
  },
  {
    id: "nuclear-energy",
    title: "Nuclear Energy",
    description: "Support developing nuclear energy in the Philippines",
  },
];

const CriteriaSelection = () => {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedPreferences.length < 3) {
      toast.error("Please select at least 3 preferences");
      return;
    }
    
    // setIsLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "against": [
            "Contractualization"
        ],
        "platforms":[
            "Free Education"
        ]
      })
    };

    fetch("https://localhost:7017/api/v1/EmbeddingSearch/similarity-search", requestOptions)
      .then(async response => {
        if(!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        return response.json()
      })
      .then(() => {
        setTimeout(() => {
          navigate("/results", { state: { preferences: selectedPreferences } });
        }, 1500);
      })
      .catch (error => {
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
              Choose at least 3 political issues that matter most to you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer transition-all ${
                  selectedPreferences.includes(preference.id)
                    ? "border-ph-blue ring-1 ring-ph-blue/20"
                    : "border-gray-100 hover:border-ph-blue/20"
                }`}
                onClick={() => togglePreference(preference.id)}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 transition-colors ${
                      selectedPreferences.includes(preference.id)
                        ? "bg-ph-blue border-ph-blue"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPreferences.includes(preference.id) && (
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
                    <h3 className="font-medium text-gray-900">{preference.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{preference.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
