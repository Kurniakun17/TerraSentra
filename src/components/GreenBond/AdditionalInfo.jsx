import { Award, Calendar, Leaf, Trophy, Users, Activity } from "lucide-react";
import React, { useState } from "react";
import useGreenBondStore from "../../store/greenBondStore";
import { additionalInfoDefaultData } from "../../constant/fallback";

export default function AdditionalInfo() {
  const { bondDetail } = useGreenBondStore();
  const [activeSection, setActiveSection] = useState("timeline");

  const infoSections = [
    {
      id: "timeline",
      title: "Project Timeline",
      icon: <Calendar className="w-5 h-5 text-green-600 mr-2" />,
    },
    {
      id: "species",
      title: "Tree Species",
      icon: <Leaf className="w-5 h-5 text-green-600 mr-2" />,
    },
    {
      id: "achievements",
      title: "Achievements & Recognition",
      icon: <Award className="w-5 h-5 text-green-600 mr-2" />,
    },
    {
      id: "partnerships",
      title: "Community Partnerships",
      icon: <Users className="w-5 h-5 text-green-600 mr-2" />,
    },
    {
      id: "benefits",
      title: "Environmental Benefits",
      icon: <Activity className="w-5 h-5 text-green-600 mr-2" />,
    },
  ];

  const additionalData =
    bondDetail?.additionalInfo || additionalInfoDefaultData;

  const getActiveSectionData = () => {
    const section = additionalData.find(
      (item) =>
        item.title === infoSections.find((s) => s.id === activeSection)?.title
    );
    return section ? section.value : [];
  };

  const activeSectionData = getActiveSectionData();

  const renderTabs = () => (
    <div className="flex overflow-x-auto mb-4 pb-1">
      {infoSections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`flex items-center px-3 py-2 mr-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
            activeSection === section.id
              ? "bg-green-100 text-green-700 font-medium"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {React.cloneElement(section.icon, {
            className: `w-4 h-4 ${
              activeSection === section.id ? "text-green-600" : "text-gray-500"
            } mr-1.5`,
          })}
          {section.title}
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "timeline":
        return (
          <div className="space-y-3">
            {activeSectionData.map((item, index) => (
              <div
                key={index}
                className="flex border-l-2 border-green-200 pl-3"
              >
                <div className="flex-shrink-0 pr-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full -ml-4 mt-2"></div>
                  <div className="text-sm font-medium text-gray-500">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="flex-grow flex items-center pt-4">
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "species":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSectionData.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 p-3 rounded-lg"
              >
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <div className="flex-grow">
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>
                </div>
                <div className="flex-shrink-0 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                  {item.quantity} trees
                </div>
              </div>
            ))}
          </div>
        );

      case "achievements":
        return (
          <div className="space-y-3">
            {activeSectionData.map((item, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 text-green-600 pt-1">
                  <Trophy size={16} />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "partnerships":
        return (
          <div className="space-y-3">
            {activeSectionData.map((item, index) => (
              <div
                key={index}
                className="flex items-start p-3 border border-gray-100 rounded-lg"
              >
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                  <Users size={16} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-3">
            {activeSectionData.map((item, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gradient-to-r from-green-50 to-white rounded-lg"
              >
                <div className="flex-shrink-0 bg-white p-1.5 rounded-full shadow-sm">
                  <Activity size={14} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Select a section to view details</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Additional Information
      </h2>

      {renderTabs()}

      <div className="p-4 border border-gray-200 rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
}
