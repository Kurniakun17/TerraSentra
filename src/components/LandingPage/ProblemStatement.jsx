import { BarChart3, Globe, Map } from "lucide-react";
import React from "react";

export default function ProblemStatement() {
  return (
    <div className="py-12 bg-tertiary-light">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Problems
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Challenges We Face Together
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flex flex-col bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <Globe className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">
                    Climate Issues
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Worsening climate change every year requires collective
                    action and targeted funding.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">
                    Uneven Green Bond Distribution
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Green funding distribution is not evenly spread, leaving
                    many potential areas overlooked.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                <div className="mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <Map className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">
                    Lack of Regional Potential Visibility
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Many regions in Indonesia have potential for green project
                    development but remain underexposed.
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
