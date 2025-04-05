import React, { useState } from "react";
import {
  Leaf,
  Car,
  Factory,
  Info,
  ArrowRight,
  TrendingUp,
  TreeDeciduous,
} from "lucide-react";
import { formatCurrency } from "../../utils/functions";
import useGreenBondStore from "../../store/greenBondStore";

export default function CarbonCreditSection() {
  const [activeView, setActiveView] = useState("overview");
  const { bondDetail } = useGreenBondStore();
  const totalCarbonCredits = bondDetail.carbonAbsorbed * 5;

  const carbonData = {
    totalCredits: totalCarbonCredits,
    yearlyReduction: bondDetail.carbonAbsorbed,
    treeEquivalent: Math.round(totalCarbonCredits * 1.7), // Approximately 1.7 trees per ton of CO2
    carEquivalent: Math.round(totalCarbonCredits * 0.22), // About 0.22 cars per ton of CO2 annually
    homeEquivalent: Math.round(totalCarbonCredits * 0.13), // Around 0.13 homes' electricity per ton
    certifiedBy: "Verified Carbon Standard (VCS)",
    projectStart: "2022",
    carbonPrice: `${formatCurrency(bondDetail.currentCarbonPrice)} per ton`,
  };

  const projectTypes = [
    { type: "Reforestation", percentage: 45, color: "bg-green-500" },
    { type: "Clean Energy", percentage: 30, color: "bg-blue-500" },
    { type: "Methane Capture", percentage: 15, color: "bg-yellow-500" },
    { type: "Soil Carbon", percentage: 10, color: "bg-purple-500" },
  ];

  const monthlyGrowth = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1550 },
    { month: "Mar", value: 1800 },
    { month: "Apr", value: 2100 },
    { month: "May", value: 2300 },
    { month: "Jun", value: 2700 },
  ];

  const renderVisualEquivalents = () => {
    const equivalents = [
      {
        icon: <Car className="h-6 w-6 text-white" />,
        value: carbonData.carEquivalent.toLocaleString(),
        text: "cars removed from roads for one year",
        color: "bg-blue-600",
      },
      {
        icon: <TreeDeciduous className="h-6 w-6 text-white" />,
        value: carbonData.treeEquivalent.toLocaleString(),
        text: "mature trees planted and grown for 10 years",
        color: "bg-green-600",
      },
      {
        icon: <Factory className="h-6 w-6 text-white" />,
        value: carbonData.homeEquivalent.toLocaleString(),
        text: "homes' electricity use for one year",
        color: "bg-amber-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {equivalents.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm"
          >
            <div
              className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${item.color} flex items-center justify-center`}
            >
              <div className="-translate-2 translate-x-1">{item.icon}</div>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-sm text-gray-600 mt-2 pr-10">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProjectBreakdown = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Carbon Credit Source Breakdown
        </h3>
        <div className="space-y-4">
          {projectTypes.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  {project.type}
                </span>
                <span className="text-gray-900 font-bold">
                  {project.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${project.color} h-2.5 rounded-full`}
                  style={{ width: `${project.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthlyGrowth = () => {
    const maxValue = Math.max(...monthlyGrowth.map((item) => item.value));

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Monthly Carbon Credit Growth
          </h3>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <span>+125% YoY</span>
            <TrendingUp className="h-4 w-4 ml-1" />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 h-60 flex items-end justify-between space-x-2">
          {monthlyGrowth.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex justify-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md"
                    style={{ height: `${height}%` }}
                  >
                    <div className="h-full flex items-start justify-center">
                      <span className="text-xs bg-gray-800 text-white px-1 py-0.5 rounded -translate-y-5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{item.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Carbon Credit Impact
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Verified carbon sequestration and environmental benefits
          </p>
        </div>
        <div className="bg-tertiary text-white font-medium px-3 py-1 rounded-full text-sm flex items-center">
          <span>{carbonData.certifiedBy}</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-tertiary/10 to-tertiary/20 rounded-xl p-6 border border-green-100 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Carbon Credits</p>
            <div className="flex items-baseline">
              <h3 className="text-4xl font-bold text-gray-900">
                {totalCarbonCredits.toLocaleString()}
              </h3>
              <span className="ml-2 text-lg text-gray-700">tons CO₂e</span>
            </div>
            <p className="text-sm text-green-600 mt-2 flex items-center">
              <ArrowRight className="h-3 w-3 mr-1" />
              Annual reduction of {bondDetail.carbonAbsorbed.toLocaleString()}{" "}
              tons CO₂e
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Market Value</p>
            <div className="flex items-baseline">
              <h3 className="text-4xl font-bold text-gray-900">
                {formatCurrency(
                  totalCarbonCredits * bondDetail.currentCarbonPrice
                )}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Based on {formatCurrency(bondDetail.currentCarbonPrice)} market
              rate
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveView("overview")}
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeView === "overview"
              ? "bg-tertiary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Visual Equivalents
        </button>
      </div>

      {activeView === "overview" && renderVisualEquivalents()}

      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          Carbon credits verified through independent third-party validation and
          monitoring. Project initiated in {carbonData.projectStart} with
          continuous measurement and reporting protocols in place.
        </p>
      </div>
    </div>
  );
}
