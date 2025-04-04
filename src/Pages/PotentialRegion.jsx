import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProfilingStore } from "../store/profilingStore";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import Navbar from "../components/LandingPage/Navbar";
import "leaflet/dist/leaflet.css";
import { getScoreColor } from "../utils/functions";

const PotentialRegion = ({ regionScores, geoJsonData }) => {
  const navigate = useNavigate();
  const { user, userType, logout } = useAuthStore();
  const { investmentInterests, riskLevel, investmentAmount, investmentTerm } =
    useProfilingStore();
  const [selectedRegion, setSelectedRegion] = useState(null);

  const getDarkerColor = (score) => {
    if (score >= 70) return "#059669";
    if (score >= 50) return "#d97706";
    return "#b91c1c";
  };

  // Styling untuk GeoJSON features
  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.name;
    const score = regionScores[provinceName] || 50;

    layer.on({
      mouseover: () => {
        setSelectedRegion({
          name: provinceName,
          score: score,
        });
        layer.setStyle({
          fillOpacity: 0.9,
          fillColor: getDarkerColor(score),
        });
      },
      mouseout: () => {
        setSelectedRegion(null);
        layer.setStyle({
          fillOpacity: 0.7,
          fillColor: getScoreColor(score),
        });
      },
      click: () => {
        // Navigasi ke halaman detail region ketika diklik
        navigate(`/potential-region/${provinceName}?score=${score}`);
      },
    });

    // Add tooltip with province name and score
    layer.bindTooltip(`${provinceName}: ${score}`, { permanent: false });
  };

  // Style untuk GeoJSON features
  const style = (feature) => {
    const provinceName = feature.properties.name;
    const score = regionScores[provinceName] || 50;

    return {
      fillColor: getScoreColor(score),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const getTopRegions = () => {
    return Object.entries(regionScores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const topRegions = getTopRegions();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full h-16"></div>
      <div className="max-w-8xl mx-auto px-3 py-4">
        <h1 className="text-2xl font-bold text-tertiary mb-4">Potential Region</h1>
        <div className="flex gap-2">
          <div className="bg-white w-full p-4 border border-gray-300/80 rounded-lg mb-4">
            <h2 className="text-lg font-medium text-tertiary mb-3">
              Your Investor Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-tertiary-light p-2 border border-green-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Investor Type</p>
                <p className="font-medium text-sm">
                  {userType === "individual" && "Individual Investor 🔵"}
                  {userType === "institutional" && "Institutional Investor 🏦"}
                  {userType === "government" && "Government & NGO 🏗️"}
                </p>
              </div>
              <div className="bg-tertiary-light p-2 border border-green-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Risk Level</p>
                <p className="font-medium text-sm">{riskLevel}</p>
              </div>
              <div className="bg-tertiary-light p-2 border border-green-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">
                  Estimated Investment Amount
                </p>
                <p className="font-medium text-sm">{investmentAmount}</p>
              </div>
              <div className="bg-tertiary-light p-2 border border-green-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Investment Term</p>
                <p className="font-medium text-sm">
                  {investmentTerm} Year{investmentTerm > 1 && "s"}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-600 mb-1">
                Green Investment Interests
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {investmentInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 bg-tertiary text-white border border-gray-300/80 rounded-lg text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white w-full p-4 border border-gray-300/80 rounded-lg mb-4">
            <h2 className="text-lg font-medium text-tertiary mb-3">
              AI Investment Score Ranking
            </h2>

            <div className="flex flex-col gap-2">
              {topRegions.map((region, index) => (
                <div
                  key={region.name}
                  className="bg-tertiary-light text-sm flex p-2 border border-green-200 rounded-lg justify-between cursor-pointer hover:bg-green-200 transition-colors"
                  onClick={() => navigate(`/region/${region.name}`)}
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: getScoreColor(region.score),
                  }}
                >
                  <p>
                    {index + 1}. {region.name}
                  </p>
                  <div className="flex items-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getScoreColor(region.score) }}
                    ></span>
                    <p>{region.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-300/80 rounded-lg">
          <h2 className="text-lg font-medium text-tertiary mb-3">
            Green Investment Distribution Map
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Click on a region to see details and investment opportunities
          </p>

          <div className="h-96 w-full">
            {geoJsonData ? (
              <MapContainer
                center={[-2.5, 118]}
                zoom={5}
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={true}
                className="rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  data={geoJsonData}
                  style={style}
                  onEachFeature={onEachFeature}
                />
                {selectedRegion && (
                  <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedRegion.name}:{" "}
                      </span>
                      <span
                        className="ml-2 px-2 py-1 rounded text-white text-xs font-medium"
                        style={{
                          backgroundColor: getScoreColor(selectedRegion.score),
                        }}
                      >
                        Score: {selectedRegion.score}
                      </span>
                    </div>
                  </div>
                )}
              </MapContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500">Memuat peta...</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span className="text-sm">Low (30-49)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
              <span className="text-sm">Medium (50-69)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-400 mr-2"></div>
              <span className="text-sm">High (70-95)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PotentialRegion;
