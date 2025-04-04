import { Globe, TrendingUp } from "lucide-react";
import React from "react";

export default function Goals() {
  return (
    <div id="about" className="py-12 bg-primary">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-white font-semibold tracking-wide uppercase">
            Our Goals
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            TerraSentra's Vision for a Sustainable Indonesia
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">
                      Accelerating the Green Economy Transition
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Driving Indonesia towards a sustainable green economy by
                    mobilizing funding and resources in a measurable and
                    targeted manner.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">
                      Equitable Green Project Funding
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Ensuring equitable distribution of green funding across
                    Indonesia, not just focusing on major cities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
