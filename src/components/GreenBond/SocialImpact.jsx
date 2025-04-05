import React, { useState } from "react";
import {
  Users,
  Home,
  GraduationCap,
  Heart,
  BookOpen,
  ChevronRight,
  BarChart2,
} from "lucide-react";
import useGreenBondStore from "../../store/greenBondStore";

export default function SocialImpact() {
  const { bondDetail } = useGreenBondStore();
  const [activeTab, setActiveTab] = useState("employment");

  // Map icons to each social impact category
  const iconMap = {
    "Employment": <Users className="w-5 h-5 text-white" />,
    "Community": <Home className="w-5 h-5 text-white" />,
    "Health": <Heart className="w-5 h-5 text-white" />,
    "Education": <GraduationCap className="w-5 h-5 text-white" />
  };

  // Map background colors to each social impact category
  const colorMap = {
    "Employment": "bg-gradient-to-r from-green-500 to-green-600",
    "Community": "bg-gradient-to-r from-blue-500 to-blue-600",
    "Health": "bg-gradient-to-r from-red-500 to-red-600",
    "Education": "bg-gradient-to-r from-yellow-500 to-yellow-600"
  };

  // Create impact data object from bondDetail
  const createImpactData = () => {
    const data = {};
    
    if (bondDetail && bondDetail.socialImpact && bondDetail.socialImpact.length > 0) {
      bondDetail.socialImpact.forEach((item, index) => {
        const key = item.title.toLowerCase();
        data[key] = {
          title: item.title,
          icon: iconMap[item.title],
          color: colorMap[item.title],
          description: item.description,
          highlight: item.impcatHighlight
        };
      });
      return data;
    }
    
    // Fallback data if bondDetail is not available
    return {
      employment: {
        title: "Employment",
        icon: iconMap["Employment"],
        color: colorMap["Employment"],
        stats: "120+ full-time jobs",
        description: "Creates sustainable forestry jobs for local communities in planting, maintenance, and conservation.",
        highlight: "120+ Jobs",
      },
      community: {
        title: "Community",
        icon: iconMap["Community"],
        color: colorMap["Community"],
        stats: "Villages with 25% income increase",
        description: "Provides sustainable forest products and ecosystem services to surrounding villages.",
        highlight: "+25% income",
      },
      health: {
        title: "Health",
        icon: iconMap["Health"],
        color: colorMap["Health"],
        stats: "Improved air quality and water access",
        description: "Improved air quality and watershed protection for nearby communities.",
        highlight: "5,000+ People",
      },
      education: {
        title: "Education",
        icon: iconMap["Education"],
        color: colorMap["Education"],
        stats: "Environmental programs and scholarships",
        description: "Environmental education programs and scholarships for local students.",
        highlight: "300+ Students",
      },
    };
  };

  const impactData = createImpactData();

  const renderIndicators = () => {
    return Object.keys(impactData).map((key) => (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        className={`flex-1 p-3 text-xs duration-300 sm:text-sm font-medium transition-all ${
          activeTab === key
            ? `${impactData[key].color} text-white shadow-md`
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        } rounded-lg mx-1 first:ml-0 last:mr-0`}
      >
        <div className="flex justify-center items-center">
          <div
            className={`${
              activeTab === key ? "bg-white/20" : "bg-white"
            } rounded-full p-1.5 mr-2`}
          >
            {React.cloneElement(impactData[key].icon, {
              className: `w-3 h-3 sm:w-4 sm:h-4 ${
                activeTab === key ? "text-white" : "text-gray-500"
              }`,
            })}
          </div>
          {impactData[key].title}
        </div>
      </button>
    ));
  };

  const renderMetrics = () => {
    // Create metrics dynamically from bondDetail data
    const metrics = [
      { value: impactData.employment.highlight || "120+ Jobs", label: "Jobs Created" },
      { value: impactData.community.highlight || "+25% income", label: "Income Growth" },
      { value: "5", label: "Partner Villages" },
      { value: impactData.health.highlight || "5,000+ People", label: "Lives Improved" },
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center"
          >
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {metric.value}
            </div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const active = impactData[activeTab];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Social Impact</h2>
        <BarChart2 className="h-6 w-6 text-green-600" />
      </div>

      {renderMetrics()}

      <div className="flex mb-6 overflow-x-auto">{renderIndicators()}</div>

      <div
        className={`${active.color} rounded-lg p-5 text-white shadow-lg transition-all duration-300 transform`}
      >
        <div className="flex items-start">
          <div className="bg-white/25 rounded-full p-3 mr-4">
            {active.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{active.title} Impact</h3>
            
            <p className="text-sm text-white text-opacity-80 mt-3">
              {active.description}
            </p>

            <div className="mt-4 bg-white/20 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm font-medium">Impact Highlight</span>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">
                  {active.highlight}
                </span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Data based on community impact assessment from 2023-2024</p>
      </div>
    </div>
  );
}