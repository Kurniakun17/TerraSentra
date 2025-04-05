import { Check } from "lucide-react";
import React from "react";

export default function CTAGreenBond() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Ready to Invest?
      </h2>
      <p className="text-gray-600 mb-6">
        Join us in making a positive impact on the environment and communities.
      </p>
      <div className="bg-tertiary/8 rounded-lg border border-tertiary p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Invest Now & Get Carbon Credits
            </h2>
            <p className="text-gray-700 mb-4">
              Starting from $1,000, get attractive returns while contributing to
              the environment. Your Carbon Credits will be registered on
              blockchain and can be traded on international carbon markets.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Check className="text-green-600 w-5 h-5 mr-1" />
                <span className="text-sm text-gray-700">Returns up to 65%</span>
              </div>
              <div className="flex items-center">
                <Check className="text-green-600 w-5 h-5 mr-1" />
                <span className="text-sm text-gray-700">
                  International Certification
                </span>
              </div>

              <div className="flex items-center">
                <Check className="text-green-600 w-5 h-5 mr-1" />
                <span className="text-sm text-gray-700">
                  Measurable Environmental Impact
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 md:px-12 rounded-lg text-xl shadow-lg transition duration-300 transform hover:scale-105">
              Start Investing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
