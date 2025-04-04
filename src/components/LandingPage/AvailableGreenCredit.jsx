import React from "react";
import { greenBonds } from "../../data/greenBonds";

import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/functions";

export default function AvailableGreenCredit() {
  return (
    <div className="py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            AVAILABLE
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Green Credits
          </p>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {greenBonds.map((bond, index) => (
              <GreenBondCards key={`greenbond-${index}`} bond={bond} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const GreenBondCards = ({ bond }) => {
  const progress = Math.floor((bond.fundRaised / bond.fundRequired) * 100);

  return (
    <div className="pt-6 rounded-xl ">
      <div className="flow-root bg-white rounded-lg overflow-clip border border-gray-300 pb-8 ">
        <div>
          <img
            src={"/banner.jpg"}
            alt={bond.title}
            className="object-cover max-h-[200px] w-full"
          />
        </div>
        <div className="mt-6 px-6">
          <Link
            to={`/greenbond/${bond.id}`}
            className="mt-4 uppercase text-lg font-bold text-gray-900 tracking-tight"
          >
            {bond.name}
          </Link>
          <p className="mt-1 text-base text-gray-500">{bond.description}</p>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Funding Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm font-medium text-gray-700">
                {formatCurrency(bond.fundRaised)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                from {formatCurrency(bond.fundRequired)}
              </span>
            </div>

            <div className="flex grid-cols-2 mt-4 gap-4 overflow-clip">
              <Link
                to={`/greenbond/${bond.id}`}
                className="w-full text-center bg-primary hover: rounded-xl py-3 text-white"
              >
                Invest Now!
              </Link>
              <button className="w-full bg-gray-200 rounded-xl py-3 text-gray-700">
                Monitor & Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
