import React from "react";

export default function Testimonials() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What They Say
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">A</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Andi Suryadi
                  </h4>
                  <h5 className="text-sm text-gray-500">Green Bond Investor</h5>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "TerraSentra provides me with an easy way to invest while
                contributing to the environment. I can see project progress in
                real-time and am proud to be part of positive change."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">B</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Budi Prasetyo
                  </h4>
                  <h5 className="text-sm text-gray-500">
                    Organic Farming SME Owner
                  </h5>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "Thanks to TerraSentra funding, my organic farming business can
                grow. Access to capital, which has been difficult to obtain, is
                now easier."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">C</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Citra Lestari
                  </h4>
                  <h5 className="text-sm text-gray-500">
                    Head of Green Independent Village
                  </h5>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "TerraSentra not only provides funding but also helps us
                discover the potential of our village that has been untapped.
                Now our village is a successful example of a green economy."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
