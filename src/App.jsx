import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PotentialRegion from "./Pages/PotentialRegion";
import RegionDetail from "./Pages/RegionDetail";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import GreenBondDetail from "./Pages/GreenBondDetail";
import CarbonCreditHistory from "./Pages/CarbonCreditHistory";
import GreenBondMarketplace from "./Pages/GreenBondMarketplace";
import GreenCreditMarketplace from "./Pages/GreenCreditMarketplace";
import GreenCreditDetail from "./Pages/GreenCreditDetail";

function App() {
  const [regionScores, setRegionScores] = useState({});
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/indonesiaProvince.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data);

        const scores = {};
        data.features.forEach((feature) => {
          const provinceName = feature.properties.name;

          scores[provinceName] = Math.floor(Math.random() * 65) + 30;
        });
        setRegionScores(scores);
      })
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/potential-regions"
          element={
            <PotentialRegion
              regionScores={regionScores}
              geoJsonData={geoJsonData}
            />
          }
        />

        <Route
          path="/potential-region/:regionName"
          element={<RegionDetail />}
        />

        <Route path="/greenbond/:id" element={<GreenBondDetail />} />
        <Route path="/greencredit/:id" element={<GreenCreditDetail/>} />

        <Route
          path="/carbon-offset-marketplace"
          element={<CarbonCreditHistory />}
        />

        <Route
          path="/greenbond-marketplace"
          element={<GreenBondMarketplace />}
        />

        <Route
          path="/greencredit-marketplace"
          element={<GreenCreditMarketplace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
