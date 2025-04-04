import { Calculator } from 'lucide-react';
import React, { useState } from 'react'
import { investmentTypeOptions } from '../../constant/type';
import { formatCurrency, getScoreRating } from '../../utils/functions';


export default function ROICalculator({ regionData }) {
    // Investment Simulation States
    const [showSimulation, setShowSimulation] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(1000000000);
    const [investmentDuration, setInvestmentDuration] = useState(5);
    const [investmentType, setInvestmentType] = useState('balanced');
    const [simulationResults, setSimulationResults] = useState(null);

    const handleCalculateSimulation = () => {
        const results = calculateInvestmentResults();
        setSimulationResults(results);
        setShowSimulation(true);
    };

    const calculateInvestmentResults = () => {
        if (!regionData) return null;

        // Base ROI ranges based on investment score
        let baseAnnualReturn;
        if (regionData.investmentScore > 75) {
            baseAnnualReturn = 0.135; // 13.5% (midpoint of 12-15%)
        } else if (regionData.investmentScore > 50) {
            baseAnnualReturn = 0.10; // 10% (midpoint of 8-12%)
        } else {
            baseAnnualReturn = 0.065; // 6.5% (midpoint of 5-8%)
        }

        let adjustedAnnualReturn;
        let riskLevel;
        let volatility;

        switch (investmentType) {
            case 'aggressive':
                adjustedAnnualReturn = baseAnnualReturn * 1.25; // 25% higher return potential
                riskLevel = "Tinggi";
                volatility = baseAnnualReturn * 0.5; // Higher volatility
                break;
            case 'conservative':
                adjustedAnnualReturn = baseAnnualReturn * 0.8; // 20% lower but more stable
                riskLevel = "Rendah";
                volatility = baseAnnualReturn * 0.2; // Lower volatility
                break;
            default: // balanced
                adjustedAnnualReturn = baseAnnualReturn;
                riskLevel = "Sedang";
                volatility = baseAnnualReturn * 0.3; // Medium volatility
        }

        // Calculate yearly projections
        const yearlyProjections = [];
        let currentValue = investmentAmount;

        for (let year = 1; year <= investmentDuration; year++) {
            // Generate random fluctuation within volatility range for realistic simulation
            const yearFluctuation = 1 + adjustedAnnualReturn + (Math.random() * volatility * 2 - volatility);
            currentValue = currentValue * yearFluctuation;

            yearlyProjections.push({
                year,
                value: Math.round(currentValue),
                growthRate: Math.round((yearFluctuation - 1) * 1000) / 10,
            });
        }

        // Calculate summary statistics
        const finalValue = yearlyProjections[yearlyProjections.length - 1].value;
        const totalProfit = finalValue - investmentAmount;
        const totalROI = (totalProfit / investmentAmount) * 100;
        const annualizedROI = Math.pow((1 + totalROI / 100), 1 / investmentDuration) - 1;

        return {
            initialInvestment: investmentAmount,
            duration: investmentDuration,
            finalValue,
            totalProfit,
            totalROI: Math.round(totalROI * 10) / 10,
            annualizedROI: Math.round(annualizedROI * 1000) / 10,
            yearlyProjections,
            riskLevel,
            investmentType
        };
    };

    return (
        <div className="bg-white p-4 border border-gray-300/80 rounded-lg ">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-tertiary flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Investment Simulation & ROI Calculator
                </h2>
                <button
                    onClick={() => setShowSimulation(!showSimulation)}
                    className="text-tertiary text-sm hover:underline"
                >
                    {showSimulation ? 'Close Simulation' : 'Show Simulation'}
                </button>
            </div>

            {showSimulation && (
                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="p-3 bg-tertiary-light border border-green-200 rounded-lg">
                            <label className="block text-sm font-medium mb-1">
                                Investment Amount (Rp)
                            </label>
                            <input
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="1000000"
                                step="100000000"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Minimum Rp 1.000.000
                            </div>
                        </div>

                        <div className="p-3 bg-tertiary-light border border-green-200 rounded-lg">
                            <label className="block text-sm font-medium mb-1">
                                Investment Duration (Year)
                            </label>
                            <select
                                value={investmentDuration}
                                onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {[1, 2, 3, 4, 5, 7, 10, 15, 20].map(year => (
                                    <option key={year} value={year}>{year} Year</option>
                                ))}
                            </select>
                        </div>

                        <div className="p-3 bg-tertiary-light border border-green-200 rounded-lg">
                            <label className="block text-sm font-medium mb-1">
                                Investment Type
                            </label>
                            <select
                                value={investmentType}
                                onChange={(e) => setInvestmentType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {investmentTypeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs text-gray-500 mt-1">
                                {investmentTypeOptions.find(opt => opt.value === investmentType)?.description}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleCalculateSimulation}
                            className="px-6 py-2 bg-tertiary hover:bg-tertiary/90 text-white font-medium rounded-lg transition duration-200"
                        >
                            Calculate Projection
                        </button>
                    </div>

                    {/* Simulation Results */}
                    {simulationResults && (
    <div className="mt-4">
        <h3 className="font-medium text-lg mb-2 text-tertiary">Investment Simulation Result</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-tertiary-light border border-green-200 rounded-lg text-center">
                <div className="text-sm text-gray-600">Initial Investment</div>
                <div className="text-2xl font-bold">{formatCurrency(simulationResults.initialInvestment)}</div>
            </div>

            <div className="p-4 bg-tertiary-light border border-green-200 rounded-lg text-center">
                <div className="text-sm text-gray-600">Final Value (Projection)</div>
                <div className="text-2xl font-bold">{formatCurrency(simulationResults.finalValue)}</div>
            </div>

            <div className="p-4 bg-tertiary-light border border-green-200 rounded-lg text-center">
                <div className="text-sm text-gray-600">Total Profit</div>
                <div className="text-2xl font-bold">{formatCurrency(simulationResults.totalProfit)}</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Total ROI</div>
                    <div className="font-bold text-lg">{simulationResults.totalROI}%</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-600">Annualized ROI (Average)</div>
                    <div className="font-bold text-lg">{simulationResults.annualizedROI}%</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-600">Risk Profile</div>
                    <div className="font-medium">{simulationResults.riskLevel}</div>
                </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Important Notes</h4>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Simulation results are projections and not guaranteed returns</li>
                    <li>Green investment in {regionData.name} has a potential of {getScoreRating(regionData.investmentScore).toLowerCase()}</li>
                    <li>Consult with an investment advisor before making a decision</li>
                </ul>
            </div>
        </div>

        <h4 className="font-medium mb-2">Yearly Value Projection</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Year</th>
                        <th className="py-2 px-3 text-right text-sm font-medium text-gray-600">Projected Value</th>
                        <th className="py-2 px-3 text-right text-sm font-medium text-gray-600">Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {simulationResults.yearlyProjections.map((projection) => (
                        <tr key={projection.year} className="border-t border-gray-200">
                            <td className="py-2 px-3 text-sm">Year {projection.year}</td>
                            <td className="py-2 px-3 text-right text-sm font-medium">{formatCurrency(projection.value)}</td>
                            <td className={`py-2 px-3 text-right text-sm font-medium ${projection.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {projection.growthRate > 0 ? '+' : ''}{projection.growthRate}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}

                </div>
            )}
        </div>
    )
}
