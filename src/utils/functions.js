const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getScoreRating = (score) => {
  if (score > 35) return "High";
  if (score >= 30 && score <= 35) return "Moderate";
  return "Low";
};

const getScoreColor = (score) => {
  if (score > 35) return "#34d399";
  if (score >= 30 && score <= 35) return "#fbbf24";
  return "#ef4444";
};

const getScoreBgClass = (score) => {
  if (score > 35) return "bg-green-600";
  if (score >= 30 && score <= 35) return "bg-yellow-500";
  return "bg-red-500";
};

function calculateEnvironmentalScore(envData) {
  if (envData.error) {
    return 50.0;
  }

  const ndvi = parseFloat(envData.ndvi) || 0;
  const ndviScore = Math.min(100, Math.max(0, ndvi * 100));

  const precip = parseFloat(envData.precipitation) || 0;
  let precipScore;
  if (precip < 50) {
    precipScore = (precip / 50) * 100;
  } else if (precip > 200) {
    precipScore = Math.max(0, 100 - ((precip - 200) / 100) * 50);
  } else {
    precipScore = 100;
  }

  const sentinel = parseFloat(envData.sentinel) || -10;
  let soilScore;
  if (sentinel < -20) {
    soilScore = 0;
  } else if (sentinel > 0) {
    soilScore = 100;
  } else {
    soilScore = ((sentinel + 20) / 20) * 100;
  }

  const weights = {
    ndvi: 0.5,
    precipitation: 0.3,
    soil: 0.2,
  };

  const environmentalScore =
    weights.ndvi * ndviScore +
    weights.precipitation * precipScore +
    weights.soil * soilScore;

  return Math.round(environmentalScore * 10) / 10;
}

export { formatCurrency, getScoreRating, calculateEnvironmentalScore, getScoreColor, getScoreBgClass };
