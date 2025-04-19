import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Facebook } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getResult } from "@/utils/result";
import NotFound from "./NotFound";

interface Result {
  id: string;
  criteria: Criteria;
  recommendation: Recommendation[];
}

interface Criteria{
  Against: string[];
  InFavor: string[];
  Platforms: string[];
}

interface Recommendation{
  Score: number;
  CandidateName: string;
  PoliticalParty: string;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reference } = useParams();
  const { state_data } = location.state || {};
  const [result, setResult] = useState<Result>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let resultData;
        
        if (state_data) {
          const parsedData = JSON.parse(state_data);
          if (parsedData.length > 0 && parsedData[0].reference === reference) {
            resultData = parsedData[0];
          }
        }

        if (!resultData && reference) {
          const serverData = await getResult(reference);
          if (serverData.length > 0) {
            resultData = serverData[0];
          }
        }

        setResult(resultData || null);
      } catch (error) {
        toast.error("Failed to load results");
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [reference, state_data]);

  const handleShare = (platform: "facebook-feed" | "facebook-story") => {
    // In a real app, implement sharing functionality
    toast.success(`Sharing to ${platform === "facebook-feed" ? "Facebook Feed" : "Facebook Story"}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ph-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-[95%] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare("facebook-feed")}
                className="flex items-center px-3 py-2 text-sm bg-[#1877F2] text-white rounded hover:bg-[#1877F2]/90 transition-colors"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Share to Feed
              </button>
              <button
                onClick={() => handleShare("facebook-story")}
                className="flex items-center px-3 py-2 text-sm bg-gradient-to-r from-[#FF7A00] to-[#FF0169] text-white rounded hover:opacity-90 transition-opacity"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share to Story
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Selected Criteria Section */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Selected Criteria</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">In Favor Of</h3>
                    <ul className="space-y-1">
                      {result.criteria.InFavor.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-ph-blue mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Against</h3>
                    <ul className="space-y-1">
                      {result.criteria.Against.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-ph-red mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Platforms</h3>
                    <ul className="space-y-1">
                      {result.criteria.Platforms.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-ph-green mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidates List Section */}
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Matching Candidates</h2>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                  {result.recommendation.map((recommendation, index) => (
                    <div
                      key={index}
                      className="p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">{recommendation.CandidateName}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-600 truncate flex-1" title={recommendation.PoliticalParty}>{recommendation.PoliticalParty}</p>
                            <div className="bg-ph-blue/10 text-ph-blue px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                              {(recommendation.Score * 100).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder for party-lists */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Coming soon!</h2>
                <div className="text-sm text-gray-600">
                  <p>This section will contain your matching party-lists.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              These results are based on publicly available information and statements from the candidates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
