import React from "react";


export default function ImpactSimulation() {
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Pollutant Change & NDVI Simulation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Pollutant Map
          </h3>
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <img
                  src="/api/placeholder/400/200"
                  alt="Pollutant map before project"
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Before
                </div>
              </div>
              <div className="relative">
                <img
                  src="/api/placeholder/400/200"
                  alt="Pollutant map after project"
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  After
                </div>
              </div>
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

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            NDVI Chart (Vegetation)
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg h-64 flex items-end">
            <div className="w-full grid grid-cols-12">
              {[
                0.1, 0.11, 0.13, 0.14, 0.15, 0.18, 0.22, 0.3, 0.45, 0.65, 0.75,
                0.82,
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end"
                >
                  <div
                    className="w-8 bg-green-600"
                    style={{ height: `${value * 200}px` }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-600">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Month 0 (Project Start)</span>
            <span>Month 12 (1 Year)</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            NDVI: Normalized Difference Vegetation Index - Indicator of
            vegetation health
          </p>
        </div>
      </div>
    </div>
  );
}
