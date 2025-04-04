import React from "react";

export default function HowWorks() {
  return (
    <div id="how-it-works" className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How TerraSentra Works
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Steps */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
              {/* Step 1 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
                    Identify Projects
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Discover potential projects through GeoAI mapping and
                    Poverty Index analysis across Indonesia.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
                    Choose Investment
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Invest funds in Green Bonds for large projects or Green
                    Credits for high-potential green SMEs.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
                    Monitor Progress
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Access real-time data and validation using remote sensing to
                    monitor project progress and environmental impact.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    4
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
                    Get Results
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Receive carbon credits and investment returns while
                    contributing to climate improvement and the green economy.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    5
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
                    Expand Impact
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Reinvest profits to expand your positive footprint and
                    contribute to a more sustainable future.
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
