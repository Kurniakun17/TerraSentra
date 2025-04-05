import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Navbar from "../components/LandingPage/Navbar";
import "leaflet/dist/leaflet.css";
import ROICalculator from "../components/shared/ROICalculator";
import {
  calculateEnvironmentalScore,
  getScoreBgClass,
  getScoreColor,
  getScoreRating,
} from "../utils/functions";
import { APIURL } from "../constant/type";

const RegionDetail = () => {
  let { regionName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [regionData, setRegionData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const risk_level = JSON.parse(localStorage.getItem("profiling-storage")).state
    .riskLevel;

  const fetchData = async () => {
    setLoading(true);
    await fetch(
      `${APIURL}/get-infrastructure/${regionName}?risk_level=${risk_level}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const investmentScoreParam = queryParams.get("score");
    const investmentScore = investmentScoreParam
      ? parseInt(investmentScoreParam)
      : null;

    fetchData();
    fetch("/indonesiaProvince.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data);

        regionName = regionName == "Dki Jakarta" ? "Jakarta Raya" : regionName;
        const regionFeature = data.features.find(
          (feature) => feature.properties.name === regionName
        );

        if (regionFeature) {
          if (investmentScore !== null) {
            const povertyIndex = Math.min(100 - investmentScore, 35);

            const totalRenewableWeight = 0.3;
            const renewableBase = Math.min(
              Math.max(investmentScore * 1.1, 30),
              85
            );

            const waterPotential = Math.floor(
              renewableBase + Math.random() * 10 - 5
            );
            const soilPotential = Math.floor(
              renewableBase + Math.random() * 10 - 5
            );
            const windPotential = Math.floor(
              renewableBase + Math.random() * 10 - 5
            );

            const greenInfra = Math.floor(
              investmentScore * 0.9 + Math.random() * 10
            );
            const envCondition = Math.floor(
              investmentScore * 0.85 + Math.random() * 15
            );

            const metricData = {
              name: regionName,
              povertyIndex: povertyIndex,
              renewableEnergyPotential: {
                water: waterPotential,
                soil: soilPotential,
                wind: windPotential,
                total: Math.floor(
                  (waterPotential + soilPotential + windPotential) / 3
                ),
              },
              greenInfrastructure: greenInfra,
              environmentalCondition: envCondition,
              investmentScore: investmentScore,
            };

            setRegionData(metricData);
          } else {
            const nameHash = regionName
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const seedRandom = (min, max) => {
              const seed = (nameHash % 100) / 100;
              return Math.floor(seed * (max - min) + min);
            };

            const waterPotential = seedRandom(10, 95);
            const soilPotential = seedRandom(15, 90);
            const windPotential = seedRandom(20, 85);
            const povertyIndex = seedRandom(5, 35);
            const greenInfra = seedRandom(10, 90);
            const envCondition = seedRandom(20, 95);

            const metricData = {
              name: regionName,
              povertyIndex: povertyIndex,
              renewableEnergyPotential: {
                water: waterPotential,
                soil: soilPotential,
                wind: windPotential,
                total: Math.floor(
                  (waterPotential + soilPotential + windPotential) / 3
                ),
              },
              greenInfrastructure: greenInfra,
              environmentalCondition: envCondition,
              investmentScore: 0,
            };

            metricData.investmentScore = Math.floor(
              (100 - metricData.povertyIndex) * 0.25 +
                metricData.renewableEnergyPotential.total * 0.3 +
                metricData.greenInfrastructure * 0.25 +
                metricData.environmentalCondition * 0.2
            );

            setRegionData(metricData);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [regionName, location.search]);

  const regionStyle = (score) => ({
    fillColor: getScoreColor(score),
    weight: 2,
    opacity: 1,
    color: "#047857",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  const style = (feature) => {
    const provinceName = feature.properties.name;

    const tempName = regionName == "Dki Jakarta" ? "Jakarta Raya" : regionName;

    if (provinceName == tempName && regionData) {
      return regionStyle(data.ai_investment_score);
    }
    return {
      fillColor: "#d1d5db",
      weight: 1,
      opacity: 0.5,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.3,
    };
  };

  const handleInvestNow = () => {
    navigate(`/invest/${regionName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-8xl mx-auto px-3 py-4">
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!regionData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-8xl mx-auto px-3 py-4">
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-red-600">
              Region Data Could not be Found
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getBoundingBox = (feature) => {
    let coords = [];
    if (feature.geometry.type === "Polygon") {
      coords = feature.geometry.coordinates[0];
    } else if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((polygon) => {
        coords = [...coords, ...polygon[0]];
      });
    }

    const lngs = coords.map((c) => c[0]);
    const lats = coords.map((c) => c[1]);

    return [
      Math.min(...lats),
      Math.min(...lngs),
      Math.max(...lats),
      Math.max(...lngs),
    ];
  };

  const findCentroid = () => {
    const regionFeature = geoJsonData.features.find(
      (feature) => feature.properties.name === regionName
    );

    if (regionFeature && regionFeature.geometry) {
      const bbox = getBoundingBox(regionFeature);
      return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
    }

    return [-2.5, 118];
  };

  function getColor(num) {
    if (num < 5) return "text-red-500";
    if (num < 10) return "text-yellow-500";
    return "text-green-500";
  }

  const center = findCentroid();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full h-16"></div>
      <div className="max-w-8xl mx-auto px-3 py-4">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/potential-regions")}
            className="text-tertiary hover:underline mr-3"
          >
            &larr; Back to Potential Region
          </button>
        </div>
        <h1 className="text-2xl font-bold text-tertiary pb-4">
          {regionData.name} Investment Profile
          <span
            className={`ml-3 px-3 py-1 text-sm ${
              data.ai_investment_score > 35
                ? "bg-green-100 text-green-800"
                : data.ai_investment_score >= 30 && data.ai_investment_score <= 35
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            } rounded-full`}
          >
            Score: {data.ai_investment_score} (
            {getScoreRating(data.ai_investment_score)})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 border border-gray-300/80 rounded-lg mb-4">
              <h2 className="text-lg font-medium text-tertiary mb-3">
                Map Overview
              </h2>
              <div className="h-96 w-full rounded-lg overflow-hidden">
                {geoJsonData && (
                  <MapContainer
                    center={center}
                    zoom={6}
                    style={{ width: "100%", height: "100%" }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON data={geoJsonData} style={style} />
                  </MapContainer>
                )}
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-300/80 rounded-lg mb-4">
              <h2 className="text-lg font-medium text-tertiary mb-4">
                Region Investment Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-tertiary-light p-4 border border-green-200 rounded-lg">
                  <h3 className="font-medium mb-2">Poverty Index</h3>
                  <div className="text-center">
                    <span
                      className={`text-3xl font-bold ${getColor(
                        data.poverty_index
                      )}`}
                    >
                      {data.poverty_index}
                    </span>
                  </div>
                  <p className="text-xs mt-2 text-gray-600 text-center">
                    *The higher the number, the better for investment
                  </p>

                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 mr-2"></div>
                      <span className="text-sm">Low ({"<"}5)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
                      <span className="text-sm">Moderate (5-10)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-emerald-400 mr-2"></div>
                      <span className="text-sm">High ({">"}10)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-tertiary-light p-4 border flex flex-col justify-between border-green-200 rounded-lg">
                  <h3 className="font-medium mb-2">
                    Renewable Energy Potential
                  </h3>
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      {data.renewable_energy}
                    </span>
                  </div>
                  <p className="text-xs mt-2 text-gray-600 text-center">
                    *Air quality, water quality, and biodiversity
                  </p>
                </div>

                <div className="bg-tertiary-light p-4 border border-green-200 rounded-lg">
                  <h3 className="font-medium mb-2">Environmental Condition</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precipitation:</span>
                      <span className="font-medium">{data.precipitation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Surface Moisture:</span>
                      <span className="font-medium">{data.sentinel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vegetation:</span>
                      <span className="font-medium">{data.ndvi}</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between font-medium">
                      <span>Environmental Score:</span>
                      <span>{calculateEnvironmentalScore(data)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-tertiary-light p-4 border flex flex-col justify-between border-green-200 rounded-lg">
                  <h3 className="font-medium mb-2">Green Infrastructure</h3>
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      {/* {regionData.greenInfrastructure > 75 ? "Very Good" :
                                                regionData.greenInfrastructure > 50 ? "Good" :
                                                    regionData.greenInfrastructure > 25 ? "Fair" : "Poor"} 
                                            */}
                      {data.infrastructure}
                    </span>
                  </div>
                  <p className="text-xs mt-2 text-gray-600 text-center">
                    *Includes bike lanes, public transport, green open spaces
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Simulation Section */}
            {/* <ROICalculator regionData={regionData} /> */}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-4 border border-gray-300/80 rounded-lg sticky top-4">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-tertiary mb-1">
                  AI Investment Score
                </h2>
                <div className="flex items-center">
                  <div className="w-full h-4 bg-gray-200 rounded-full">
                    <div
                      className={`h-4 rounded-full ${getScoreBgClass(
                        data.ai_investment_score
                      )}`}
                      style={{ width: `${data.ai_investment_score * 2}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-2xl font-bold">
                    {data.ai_investment_score}
                  </span>
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  The investment score is calculated based on various indicators
                  including poverty index, renewable energy potential, green
                  infrastructure, and environmental condition.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Investment Recommendations</h3>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  {regionData.renewableEnergyPotential.water > 60 && (
                    <li>High potential for hydroelectric power plants</li>
                  )}
                  {regionData.renewableEnergyPotential.wind > 60 && (
                    <li>Suitable for wind turbine development</li>
                  )}
                  {regionData.renewableEnergyPotential.soil > 60 && (
                    <li>Potential for bioenergy/biomass development</li>
                  )}
                  {regionData.povertyIndex > 20 && (
                    <li>
                      Investment with a focus on job creation is recommended
                    </li>
                  )}
                  {regionData.greenInfrastructure < 50 && (
                    <li>
                      Great opportunity for{" "}
                      <span className="font-bold">{data.infrastructure}</span>{" "}
                      investment
                    </li>
                  )}
                </ul>
              </div>

              <button
                onClick={handleInvestNow}
                className="w-full py-3 bg-tertiary hover:bg-tertiary/90 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Make Green Project
              </button>

              <button className="w-full mt-2 py-2 bg-white border border-tertiary text-tertiary hover:bg-tertiary/10 font-medium rounded-lg transition duration-200">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionDetail;
