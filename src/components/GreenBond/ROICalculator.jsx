import React, { useState } from "react";

export default function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(10000000);

  const calculateROI = (amount) => {
    const baseReturn = amount * 1.4;
    const carbonCredits = amount * 0.25;
    return baseReturn + carbonCredits;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ROI Investment Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Initial Investment Input
          </h3>
          <div className="mb-4">
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="1000000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Rp. 1,000,000</span>
              <span>Rp. 100,000,000</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Investment Amount
            </label>
            <div className="mt-1 relative rounded-md border border-gray-300">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp. </span>
              </div>
              <input
                type="text"
                value={investmentAmount.toLocaleString()}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setInvestmentAmount(Number(value));
                }}
                className="focus:ring-green-500 focus:border-green-500 block w-full pl-12 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Investment Results (5 years)
          </h3>
          <div className="bg-gradient-to-r from-tertiary/10 to-tertiary/20 border border-tertiary/50 rounded-lg p-4">
            <div className="flex flex-col">
              <div className="mb-3">
                <div className="text-sm text-gray-600">Principal Amount</div>
                <div className="text-xl font-bold text-gray-800">
                  Rp. {investmentAmount.toLocaleString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600">Investment Return</div>
                <div className="text-xl font-bold text-green-600">
                  Rp. {(investmentAmount * 0.4).toLocaleString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-asm text-gray-600">Carbon Credit</div>
                <div className="text-xl font-bold text-green-700">
                  Rp. {(investmentAmount * 0.25).toLocaleString()}
                </div>
              </div>
              <div className="pt-3 border-t border-green-200">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold text-green-800">
                  Rp. {calculateROI(investmentAmount).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>


      
      </div>
    </div>
  );
}
