import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Facebook } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

interface Candidate {
  id: string;
  candidate_name: string;
  score: Float32Array;
  political_party: string;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reference } = useParams();
  let { preferences, data } = location.state || {};

  if (!preferences || !data) {
    // Request preferences and data from server
  }

  const candidates: Candidate[] = JSON.parse(data);
  console.log(candidates);

  const handleShare = (platform: "facebook-feed" | "facebook-story") => {
    // In a real app, implement sharing functionality
    toast.success(`Sharing to ${platform === "facebook-feed" ? "Facebook Feed" : "Facebook Story"}`);
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Matching Candidates</h1>
                <p className="text-gray-600">
                  Based on {preferences.length} selected preferences
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
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:border-ph-blue/20 hover:shadow-md transition-all"
              >
                <div className="relative">
                  <img
                    src=""
                    alt={candidate.candidate_name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-ph-blue border border-ph-blue/20">
                    {candidate.score}% Match
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{candidate.candidate_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{candidate.political_party}</p>
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
