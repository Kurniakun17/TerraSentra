import { Check } from "lucide-react";
import React from "react";

export default function Tech() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Our Technology
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powered by Cutting-Edge Innovation
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                GeoAI for Potential Mapping
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      Geospatial data analysis to identify optimal locations
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      Poverty Index to maximize socio-economic impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      Machine learning algorithms for project success prediction
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Remote Sensing for Validation
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      NDVI (Normalized Difference Vegetation Index) for
                      vegetation monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      Simulation of post-project environmental impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-tertiary-lbg-tertiary-light0" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">
                      Satellite imagery data analysis for transparency and
                      accountability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
