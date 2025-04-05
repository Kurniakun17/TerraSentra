import { Check } from "lucide-react";
import React from "react";

export default function AIValuation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        AI-Powered Green Bond Valuation
      </h2>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 pr-6">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">A+</div>
            <div className="text-lg font-medium text-gray-800">
              AI Investment Score
            </div>
            <div className="flex justify-center mt-2">
              <div className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                <Check className="w-4 h-4 mr-1" />
                High Potential
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 mt-6 md:mt-0">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Analysis Factors
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-1/4 text-gray-700">Location</div>
              <div className="w-2/4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 pl-4 flex items-center">
                <Check className="w-5 h-5 text-green-600" />
                <span className="ml-1 text-gray-700">Excellent</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-gray-700">Carbon Impact</div>
              <div className="w-2/4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 pl-4 flex items-center">
                <Check className="w-5 h-5 text-green-600" />
                <span className="ml-1 text-gray-700">Excellent</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-gray-700">Sustainability</div>
              <div className="w-2/4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 pl-4 flex items-center">
                <Check className="w-5 h-5 text-green-600" />
                <span className="ml-1 text-gray-700">Very Good</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/4 text-gray-700">Investment Risk</div>
              <div className="w-2/4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 pl-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="ml-1 text-gray-700">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
