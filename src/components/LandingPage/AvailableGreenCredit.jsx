import React from "react";
import { GreenCreditCard } from "../GreenCredit/GreenCreditCard";
import useGreenCreditStore from "../../store/greenCreditStore";

export default function AvailableGreenCredit() {
  const { credits } = useGreenCreditStore();

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
            {credits.slice(0, 3).map((credit, index) => (
              <GreenCreditCard
                credit={credit}
                key={credit.id + " GreenCreditCard" + index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
