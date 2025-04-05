import { Leaf, Info } from "lucide-react";
import React, { useState } from "react";
import GaugeProgressbar from "../shared/GaugeProgressbar";
import useGreenBondStore from "../../store/greenBondStore";
import PollutantMap from "./PollutantMap";

export default function BannerInsight() {
  const { bondDetail } = useGreenBondStore();
  const no2 = Math.floor(bondDetail.aqi.variable.no2 / 8);
  const so2 = Math.floor(bondDetail.aqi.variable.so2 / 8);
  const co = Math.floor(bondDetail.aqi.variable.co / 8);

  const city = bondDetail?.location.split(",")[0];
  
  const thresholds = {
    NO2: { good: 40, moderate: 70, poor: 150 },
    SO2: { good: 20, moderate: 80, poor: 250 },
    CO: { good: 10, moderate: 30, poor: 50 },
  };

  const pollutants = {
    NO2: { value: 50, unit: "µg/m³" },
    SO2: { value: 20, unit: "µg/m³" },
    CO: { value: 15, unit: "µg/m³" },
  };

  const getColorClass = (type, value) => {
    const threshold = thresholds[type];
    if (value <= threshold.good) return "border-green-500";
    if (value <= threshold.moderate) return "border-yellow-500";
    return "border-red-500";
  };

  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  const showTooltip = (type, e) => {
    const threshold = thresholds[type];
    let content = `${type}: ${pollutants[type].value} ${pollutants[type].unit}\n`;

    if (pollutants[type].value <= threshold.good) {
      content += `Good level: Below ${threshold.good} ${pollutants[type].unit} is considered safe.`;
    } else if (pollutants[type].value <= threshold.moderate) {
      content += `Moderate level: Between ${threshold.good}-${threshold.moderate} ${pollutants[type].unit} may affect sensitive groups.`;
    } else {
      content += `Poor level: Above ${threshold.moderate} ${pollutants[type].unit} may cause health effects.`;
    }

    setTooltip({
      show: true,
      content,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, show: false });
  };

  return (
    <div className="bg-tertiary/8 border border-tertiary/50 rounded-lg p-6 mb-6 relative">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
          <Leaf className="h-6 w-6 text-green-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-green-800">
            This Project is Worth Investing In
          </h2>
          <p className="mt-1 text-gray-600">
            AI analysis shows potential CO₂ reduction of 2,500 tons per year
            with an 85% reforestation success rate based on historical data.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-800">
            Air Quality Index (AQI)
          </h3>
          <div className="mt-2 flex flex-col space-y-4">
            <div className="mx-auto">
              <GaugeProgressbar percentage={bondDetail.aqi.score} />
              <p className="text-xs mt-2 text-gray-600 text-center -translate-y-5">
                Current AQI
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`flex justify-between border ${getColorClass(
                  "NO2",
                  no2
                )} rounded-full px-3 py-2 cursor-help relative hover:bg-gray-50 transition-colors`}
                onMouseEnter={(e) => showTooltip("NO2", e)}
                onMouseMove={(e) => showTooltip("NO2", e)}
                onMouseLeave={hideTooltip}
              >
                <p className="text-xs text-gray-600">NO₂</p>
                <p className="text-xs text-gray-600">{no2} µg/m³</p>
              </div>
              <div
                className={`flex justify-between border ${getColorClass(
                  "SO2",
                  so2
                )} rounded-full px-3 py-2 cursor-help relative hover:bg-gray-50 transition-colors`}
                onMouseEnter={(e) => showTooltip("SO2", e)}
                onMouseMove={(e) => showTooltip("SO2", e)}
                onMouseLeave={hideTooltip}
              >
                <p className="text-xs text-gray-600">SO₂</p>
                <p className="text-xs text-gray-600">{so2} µg/m³</p>
              </div>
              <div
                className={`flex justify-between border ${getColorClass(
                  "CO",
                  co
                )} rounded-full px-3 py-2 cursor-help relative hover:bg-gray-50 transition-colors`}
                onMouseEnter={(e) => showTooltip("CO", e)}
                onMouseMove={(e) => showTooltip("CO", e)}
                onMouseLeave={hideTooltip}
              >
                <p className="text-xs text-gray-600">CO</p>
                <p className="text-xs text-gray-600">{co} µg/m³</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Pollutant Map
          </h3>
          <PollutantMap/>
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="grid grid-cols-1 gap-2">
              <div className="relative"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
                <span>High Concentration</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                <span>Medium Concentration</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Low Concentration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="fixed bg-white p-3 rounded-md shadow-lg text-sm max-w-xs z-[100] border border-gray-200"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <p className="whitespace-pre-line">{tooltip.content}</p>
        </div>
      )}
    </div>
  );
}
