import React from "react";

export default function CTA() {
  return (
    <div className="bg-primary">
      <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to Contribute?</span>
          <span className="block">
            Start your journey towards a{" "}
            <span className="text-green-400">Greener Indonesia</span>.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-white/90 duration-300"
            >
              Get Started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-tertiary/100 hover:bg-tertiary/90 duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
