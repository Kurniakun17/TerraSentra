import React from "react";

export default function GaugeProgressbar({ percentage = 50 }) {
  const adjustedpercentage = (percentage / 100) * 75;

  return (
    <div className="relative size-40">
      <svg
        className="rotate-[135deg] size-full"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200"
          strokeWidth="1.5"
          strokeDasharray="75 100"
          strokeLinecap="round"
        ></circle>

        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-primary"
          strokeWidth="1.5"
          strokeDasharray={`${adjustedpercentage} 100`}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl font-bold text-primary">{percentage}</span>
        <span className="text-primary block">Score</span>
      </div>
    </div>
  );
}
