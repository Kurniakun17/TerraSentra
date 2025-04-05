import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function FAQGreenBond() {
  const [openItems, setOpenItems] = useState({
    howWork: true,
    carbonCredits: false,
    investment: false,
  });

  const toggleItem = (item) => {
    setOpenItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        
        <div className="border border-gray-200 rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleItem("howWork")}
          >
            <span className="text-base font-medium text-gray-800">
              How do green bonds work?
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.howWork ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {openItems.howWork && (
            <div className="p-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Green bonds are financial instruments issued to fund
                environmental projects such as renewable energy, energy
                efficiency, clean transportation, and sustainable resource
                management. Investors purchase these bonds and receive returns
                from project success as well as carbon credits generated.
              </p>
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleItem("carbonCredits")}
          >
            <span className="text-base font-medium text-gray-800">
              What are carbon credits?
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.carbonCredits ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {openItems.carbonCredits && (
            <div className="p-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Carbon credits are certificates representing the reduction or
                absorption of one ton of carbon dioxide (CO₂) from the
                atmosphere. These credits can be traded in international carbon
                markets, allowing companies and individuals to offset their
                carbon emissions by supporting projects that reduce greenhouse
                gas emissions.
              </p>
            </div>
          )}
        </div>

        
        <div className="border border-gray-200 rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleItem("investment")}
          >
            <span className="text-base font-medium text-gray-800">
              How is my investment secured?
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.investment ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {openItems.investment && (
            <div className="p-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Your investment is protected through escrow mechanisms and
                verified smart contracts. Every carbon credit transaction is
                recorded on a transparent blockchain. This project is also
                certified by international organizations like Verra and Gold
                Standard, ensuring its credibility.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
