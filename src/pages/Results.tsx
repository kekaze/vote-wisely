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
  const [result, setResult] = useState<Result>();
  const [isLoading, setIsLoading] = useState(true);
  const { data } = location.state || {};

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let resultData;
        
        if (data) {
          const parsedData = JSON.parse(data);
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
  }, [reference, data]);

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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Matching Candidates</h1>
                <p className="text-gray-600">
                  Based on selected preferences
                </p>
              </div>
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
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {result.recommendation.map((recommendation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:border-ph-blue/20 hover:shadow-md transition-all"
              >
                <div className="relative">
                  <img
                    src=""
                    alt={recommendation.CandidateName}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-ph-blue border border-ph-blue/20">
                    {(recommendation.Score * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{recommendation.CandidateName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{recommendation.PoliticalParty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
