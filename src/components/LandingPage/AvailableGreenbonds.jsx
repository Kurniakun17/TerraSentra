import React from "react";
import { GreenBondCard } from "../shared/GreenBondCard";
import useGreenBondStore from "../../store/greenBondStore";

export default function AvailableGreenbonds() {
  const { bonds } = useGreenBondStore();

  return (
    <div className="py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            AVAILABLE
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Green Bonds
          </p>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bonds.map((bond, index) => (
              <GreenBondCard key={`greenbond-${index}`} bond={bond} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
