import { Award, Map, TreeDeciduous, Users } from "lucide-react";
import React from "react";

export default function Impacts() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Our Impact
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Building a Greener Indonesia
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-tertiary/20 text-primary mx-auto">
                <TreeDeciduous className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">
                500+ Hectares
              </h3>
              <p className="mt-2 text-base text-gray-500">Green land managed</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-tertiary/20 text-primary mx-auto">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">
                120+ SMEs
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Green businesses supported
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-tertiary/20 text-primary mx-auto">
                <Map className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">
                18+ Provinces
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Project coverage areas
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-tertiary/20 text-primary mx-auto">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">
                50,000+ Tons
              </h3>
              <p className="mt-2 text-base text-gray-500">Carbon absorbed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
