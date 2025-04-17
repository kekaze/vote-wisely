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
  with_reservations: string[];
  platforms: string[];
}

const preferences: Criteria[] = [
  {
    "title": "Charter Change (Cha-Cha)",
    "description": "Pag-amyenda o pagpalit sa 1987 Constitution. Usapin dito ang sistema ng gobyerno, term limits, at foreign ownership."
  },
  {
    "title": "West Philippine Sea (WPS)",
    "description": "Pagtindig ng Pilipinas laban sa pag-angkin ng China sa ating karagatan."
  },
  {
    "title": "SOGIE Equality Bill / LGBTQ+ Rights",
    "description": "Batas na poprotekta sa mga LGBTQ+ laban sa diskriminasyon. Kasama rin dito ang usapin ng same-sex civil union."
  },
  {
    "title": "Divorce Legalization",
    "description": "Pagsasabatas ng diborsyo para sa mga mag-asawang hindi na magkasundo at nais nang legal na maghiwalay."
  },
  {
    "title": "Jeepney Modernization",
    "description": "Pagpalit sa mga lumang jeep ng mga bago at environment-friendly na sasakyan. Isyu ang gastos at epekto sa mga tsuper."
  },
  {
    "title": "Mandatory ROTC",
    "description": "Pagbabalik ng sapilitang ROTC sa mga estudyante para daw sa disiplina at nasyonalismo."
  },
  {
    "title": "Violence against Illegal Drugs",
    "description": "Paggamit ng dahas laban sa iligal na droga."
  },
  {
    "title": "Non-violent approach to illegal drugs",
    "description": "Pagkontrol sa iligal na droga gamit ang rehabilitasyon at paghuli sa big-time drug lords"
  },
  {
    "title": "Environmental Policies",
    "description": "Pagkontrol sa pagmimina, paggamit ng renewable energy, at paglaban sa climate change."
  },
  {
    "title": "Relations with US & China",
    "description": "Pakikipag-ugnayan ng Pilipinas sa malalakas na bansa tulad ng Amerika at China."
  },
  {
    "title": "Federalism",
    "description": "Pagbabago ng sistema ng gobyerno patungong pederalismo upang gawing mas makapangyarihan ang mga rehiyon."
  },
  {
    "title": "Death Penalty Restoration",
    "description": "Pagbabalik ng parusang kamatayan para sa mga karumal-dumal na krimen."
  },
  {
    "title": "Fake News / Disinformation",
    "description": "Paglaban sa pagkalat ng maling impormasyon o 'fake news,' lalo na online."
  },
  {
    "title": "Political Dynasties",
    "description": "Pagkontrol o pagbawal sa mga magkakamag-anak na sabay-sabay o sunod-sunod na tumatakbo sa pwesto."
  },
  {
    "title": "OFW Welfare and Protection",
    "description": "Pagtiyak sa kaligtasan, karapatan, at pagbibigay ng sapat na tulong sa mga OFWs."
  },
  {
    "title": "Food Security",
    "description": "Pagtitiyak sa sapat, abot-kaya, at ligtas na pagkain. Kasama dito ang modernisasyon ng agrikultura, epekto ng climate change, at distribusyon ng pagkain."
  },
  {
    "title": "Water Security",
    "description": "Pagtiyak sa malinis at sapat na supply ng tubig para sa mga tahanan, agrikultura, at industriya."
  },
  {
    "title": "Land Reform",
    "description": "Pantay na pamamahagi ng lupa sa mga magsasaka at pagresolba sa mga isyu ng pagmamay-ari at pangungupahan ng lupa."
  },
  {
    "title": "Health System Strengthening",
    "description": "Pagpapalakas ng imprastraktura sa kalusugan, pagdagdag ng mga propesyonal sa medisina, pagtugon sa mental health, at paghahanda sa pandemya."
  },
  {
    "title": "Education Reform",
    "description": "Pagbabago sa kurikulum para sa pangangailangan ng merkado ng trabaho, pagpapabuti ng edukasyon sa malalayong lugar, at paggamit ng teknolohiya sa edukasyon."
  },
  {
    "title": "Digital Transformation / E-Governance",
    "description": "Paggamit ng teknolohiya para mapabuti ang serbisyo ng gobyerno, mapataas ang efficiency, at magkaroon ng transparency."
  },
  {
    "title": "Climate Change Adaptation and Mitigation",
    "description": "Pagbuo at pagpapatupad ng mga estratehiya para harapin ang epekto ng climate change at pagbabawas ng greenhouse gas emissions."
  },
  {
    "title": "Urban Development and Housing",
    "description": "Pagtugon sa mga hamon ng mabilis na urbanisasyon, kabilang ang traffic, informal settlements, at sustainable urban planning."
  },
  {
    "title": "Culture and Heritage Preservation",
    "description": "Pangangalaga at pagtataguyod ng mayamang kultura at pamana ng Pilipinas."
  },
  {
    "title": "Good Governance and Bureaucratic Efficiency",
    "description": "Pagpapabilis sa mga proseso ng gobyerno, pagbabawas ng red tape, at pagtataguyod ng transparency at accountability."
  },
  {
    "title": "Tax Reform",
    "description": "Pagtitiyak ng patas at efficient na sistema ng pagbubuwis para mapondohan ang mga programa at serbisyo ng gobyerno."
  },
  {
    "title": "Pension System Sustainability",
    "description": "Pagtitiyak sa pangmatagalang seguridad ng mga pondo ng pensiyon para sa mga retirado."
  }
];

const platforms: Platform[] = [
  {
    "title": "Poverty Reduction Programs",
    "description": "Mga programa tulad ng 4Ps (cash aid), pangkabuhayan, at tulong sa mahihirap para maibsan ang kahirapan."
  },
  {
    "title": "Job Creation",
    "description": "Paglikha ng mas maraming trabaho sa pamamagitan ng paghikayat sa mga negosyo na mamuhunan dito."
  },
  {
    "title": "Affordable Healthcare",
    "description": "Pagsisigurong abot-kaya ang pagpapaospital at gamot; pagpapatayo ng mas maraming ospital at health centers."
  },
  {
    "title": "Quality Education",
    "description": "Pagpapaganda ng kalidad ng edukasyon (K-12 review), dagdag sahod sa guro, scholarships, at sapat na pasilidad sa eskwela."
  },
  {
    "title": "Support for Farmers & Fisherfolk",
    "description": "Tulong sa mga magsasaka at mangingisda: subsidiya sa pataba/binhi, irigasyon, farm-to-market roads, laban sa smuggling."
  },
  {
    "title": "Infrastructure Development",
    "description": "Pagpapatayo ng mga kalsada, tulay, tren, airport, at internet infrastructure para mapabilis ang transportasyon at ekonomiya."
  },
  {
    "title": "Anti-Corruption Drive",
    "description": "Mga hakbang para labanan ang korapsyon sa gobyerno; pagpapatupad ng transparency at pananagutan sa mga opisyal."
  },
  {
    "title": "Ending 'Endo' / Contractualization",
    "description": "Pagtigil sa sistema ng paulit-ulit na short-term contracts."
  },
  {
    "title": "Peace and Order",
    "description": "Pagpapanatili ng kapayapaan at kaayusan; pagsugpo sa krimen, terorismo, at pagpapatuloy ng peace process sa mga rebelde."
  },
  {
    "title": "Environmental Protection",
    "description": "Mga programa para sa pangangalaga ng kalikasan, at paghahanda sa climate change."
  },
  {
    "title": "Support for MSMEs",
    "description": "Pagtulong sa maliliit na negosyo (Micro, Small, Medium Enterprises) tulad ng pautang, o training."
  },
  {
    "title": "Disaster Preparedness & Resilience",
    "description": "Paghahanda ng mga komunidad para sa mga sakuna tulad ng bagyo, lindol, baha; mabilis na tulong sa mga biktima."
  },
  {
    "title": "Tourism Promotion",
    "description": "Pagpapalakas ng turismo para makalikha ng trabaho at mapakilala ang ganda ng Pilipinas."
  },
  {
    "title": "Improved Internet Connectivity",
    "description": "Pagsisigurong mabilis, mura, at abot-kamay ang internet service sa buong bansa."
  },
  {
    "title": "Affordable Housing",
    "description": "Mga programa para sa pagpapatayo ng murang pabahay para sa mga Pilipinong walang sariling tahanan."
  },
  {
    "title": "Energy Security & Lower Power Costs",
    "description": "Pagsisigurong sapat at hindi palaging tumataas ang presyo ng kuryente; pag-explore ng mas murang energy sources."
  },
  {
    "title": "Judicial Reform",
    "description": "Pagpapabilis sa pag-usad ng mga kaso sa korte at pagtiyak na pantay ang hustisya para sa lahat."
  },
  {
    "title": "Rural Development",
    "description": "Mga komprehensibong plano para sa pagpapabuti ng kalidad ng buhay at oportunidad sa ekonomiya sa mga rural na lugar."
  },
  {
    "title": "Empowerment of Women",
    "description": "Mga patakaran at programa na naglalayong isulong ang pagkakapantay-pantay ng kasarian at pagbibigay-kapangyarihan sa kababaihan."
  },
  {
    "title": "Youth Development",
    "description": "Mga inisyatibo na nakatuon sa edukasyon, trabaho, at pakikilahok ng mga kabataan sa lipunan."
  },
  {
    "title": "Protection of Indigenous Peoples' Rights",
    "description": "Pagkilala at pagtataguyod sa mga karapatan ng mga katutubong mamamayan."
  },
  {
    "title": "Science and Technology Development",
    "description": "Pamumuhunan sa pananaliksik at pagpapaunlad at pagtataguyod ng inobasyon."
  },
  {
    "title": "Social Welfare Programs",
    "description": "Pagtugon sa mga pangangailangan ng mga senior citizen, persons with disabilities, at single-parent families."
  },
  {
    "title": "Strengthening Local Governance",
    "description": "Pagbibigay-kapangyarihan sa mga Local Government Units (LGUs) at pagtitiyak na mayroon silang sapat na resources at awtonomiya."
  },
  {
    "title": "International Relations",
    "description": "Paglalahad ng pananaw ng kandidato sa pakikipag-ugnayan sa iba pang bansa at internasyonal na organisasyon."
  },
  {
    "title": "Cybersecurity",
    "description": "Mga estratehiya para protektahan ang digital infrastructure ng bansa at labanan ang cybercrime."
  },
  {
    "title": "Arts and Culture Development",
    "description": "Pagsuporta sa sektor ng sining at kultura."
  },
  {
    "title": "Cost of Living / Inflation",
    "description": "Pagtugon sa tumataas na presyo ng mga pangunahing bilihin."
  },
];

const CriteriaSelection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<SelectedCriteria>({
    in_favor: [],
    against: [],
    with_reservations: [],
    platforms: []
  });

  const togglePreference = (title: string, category: keyof SelectedCriteria) => {
    setSelectedPreferences((prev) => {
      const criteria = { ...prev };
      
      if (category === "in_favor" || category === "against" || category === "with_reservations") {
        const otherCategories = ["in_favor", "against", "with_reservations"].filter(c => c !== category);
        otherCategories.forEach(otherCategory => {
          criteria[otherCategory] = criteria[otherCategory].filter(p => p !== title);
        });
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

    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/EmbeddingSearch/CandidateSearch`, requestOptions)
      .then(async response => {
        const data = await response.json();
        if(!response.ok) {
          throw new Error(data.message);
        }

        setIsLoading(false);
        navigate(`/result/${data.reference}`, { 
          state: {
            state_data: data.result
          } 
        });
      })
      .catch (error => {
        setIsLoading(false);
        toast.error(`Failed to process your request: ${error.message}`);
        return;
      })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="w-full">
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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                  <div className="mt-4 flex flex-col gap-2 w-full">
                    <button
                      onClick={() => togglePreference(preference.title, "in_favor")}
                      className={`w-full px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedPreferences.in_favor.includes(preference.title)
                          ? "bg-ph-blue text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-ph-blue/10"
                      }`}
                    >
                      In Favor
                    </button>
                    <button
                      onClick={() => togglePreference(preference.title, "with_reservations")}
                      className={`w-full px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedPreferences.with_reservations.includes(preference.title)
                          ? "bg-ph-yellow text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-ph-yellow/10"
                      }`}
                    >
                      With Reservations
                    </button>
                    <button
                      onClick={() => togglePreference(preference.title, "against")}
                      className={`w-full px-3 py-1.5 text-sm rounded-full transition-colors ${
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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
