import { DollarSign, Map, TrendingUp, Users } from "lucide-react";
import React from "react";

export default function KeyFeatures() {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Key Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            TerraSentra Solutions
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="lg:pr-12">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
                    <Map className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Mapping Green Project Potential
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Utilizing GeoAI and Poverty Index technology to identify
                    potential locations across Indonesia for strategic green
                    projects.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Geospatial data analysis to identify optimal locations
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Helping data-driven decision making for green bonds
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Poverty index analysis for maximum social impact
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 mt-10 lg:mt-0">
                <div className="bg-tertiary-light rounded-lg p-3 flex items-center justify-center h-64 lg:h-full">
                  <img
                    src="/feature-1.png"
                    alt="GeoAI mapping"
                    className="rounded-lg shadow-md w-7/10"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row-reverse">
              <div className="flex-1">
                <div className="lg:pl-12">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Green Bond Investment
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Invest in large-scale green projects with returns in the
                    form of carbon credits and process transparency through
                    remote sensing.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Project validation using NDVI (Normalized Difference
                        Vegetation Index)
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Simulation of environmental impact projections
                        post-project
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Measurable and transparent pollutant reduction
                        calculations
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 mt-10 lg:mt-0">
                <div className="bg-tertiary-light rounded-lg p-3 flex items-center justify-center h-64 lg:h-full">
                  <img
                    src="/feature-2.png"
                    alt="Green bond investment"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="lg:pr-12">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Green Credits Investment for SMEs
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Supporting small and medium enterprises in the green sector
                    to create sustainable economic equity.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Equitable funding distribution not centered in major
                        cities
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Funding support for high-potential green SMEs
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Creating an inclusive green economic ecosystem
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 mt-10 lg:mt-0">
                <div className="bg-tertiary-light rounded-lg p-3 flex items-center justify-center h-64 lg:h-full">
                  <img
                    src="/feature-3.png"
                    alt="UMKM green financing"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col lg:flex-row-reverse">
              <div className="flex-1">
                <div className="lg:pl-12">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Carbon Offset Marketplace
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Invest in large-scale green projects with returns in the
                    form of carbon credits and process transparency through
                    remote sensing.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Project validation using NDVI (Normalized Difference
                        Vegetation Index)
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Simulation of environmental impact projections
                        post-project
                      </p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-tertiary/20 text-primary">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="ml-3 text-gray-500">
                        Measurable and transparent pollutant reduction
                        calculations
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 mt-10 lg:mt-0">
                <div className="bg-tertiary-light rounded-lg p-3 flex items-center justify-center h-64 lg:h-full">
                  <img
                    src="/feature-4.png"
                    alt="Carbon Offset Marketplace"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
