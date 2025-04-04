const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(amount);
};

const getScoreRating = (score) => {
    if (score >= 70) return "High";
    if (score >= 50) return "Moderate";
    return "Low";
};

const getScoreColor = (score) => {
    if (score >= 70) return '#34d399'; // Green for high scores
    if (score >= 50) return '#fbbf24'; // Yellow for medium scores
    return '#ef4444'; // Red for low scores
};

const getScoreBgClass = (score) => {
    if (score >= 70) return "bg-green-600";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
};


export { formatCurrency, getScoreRating, getScoreColor, getScoreBgClass };