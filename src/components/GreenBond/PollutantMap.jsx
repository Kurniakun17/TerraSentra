import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import useGreenBondStore from "../../store/greenBondStore";
import "leaflet/dist/leaflet.css";
function getPoluttantColor(value, min = 20.5, max = 25.5) {
  const range = max - min;

  if (value >= max - 0.2 * range) {
    return "#2ecc71";
  } else if (value >= max - 0.4 * range) {
    return "#f1c40f";
  } else if (value >= max - 0.6 * range) {
    return "#f39c12";
  } else if (value >= max - 0.8 * range) {
    return "#e67e22";
  } else {
    return "#e74c3c";
  }
}

export default function PollutantMap() {
  const { bondDetail } = useGreenBondStore();
  const city = bondDetail?.location.split(",")[0]?.toLowerCase() ?? "sidoarjo";
  const [geoJsonLayers, setGeoJsonLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([-7.4478, 112.7183]);

  const fetchGeoJsonFiles = async (cityName) => {
    try {
      setLoading(true);

      const fileNames = [];

      if (cityName === "bantul") {
        fileNames.push(
          "id3402010_srandakan.geojson",
          "id3402020_sanden.geojson",
          "id3402030_kretek.geojson",
          "id3402040_pundong.geojson",
          "id3402050_bambang_lipuro.geojson",
          "id3402060_pandak.geojson",
          "id3402070_bantul.geojson",
          "id3402080_jetis.geojson",
          "id3402090_imogiri.geojson",
          "id3402100_dlingo.geojson",
          "id3402110_pleret.geojson",
          "id3402120_piyungan.geojson",
          "id3402130_banguntapan.geojson",
          "id3402140_sewon.geojson",
          "id3402150_kasihan.geojson",
          "id3402160_pajangan.geojson",
          "id3402170_sedayu.geojson"
        );
      } else if (cityName === "jakarta_pusat") {
        fileNames.push(
          "id3173010_tanah_abang.geojson",
          "id3173020_menteng.geojson",
          "id3173030_senen.geojson",
          "id3173040_johar_baru.geojson",
          "id3173050_cempaka_putih.geojson",
          "id3173060_kemayoran.geojson",
          "id3173070_sawah_besar.geojson",
          "id3173080_gambir.geojson",
          "id3173020_kota_jakarta_pusat.geojson"
        );
      } else if (cityName === "sidoarjo") {
        fileNames.push(
          "id3515_sidoarjo.geojson",
          "id3515010_tarik.geojson",
          "id3515020_prambon.geojson",
          "id3515030_krembung.geojson",
          "id3515040_porong.geojson",
          "id3515050_jabon.geojson",
          "id3515060_tanggulangin.geojson",
          "id3515070_candi.geojson",
          "id3515080_tulangan.geojson",
          "id3515090_wonoayu.geojson",
          "id3515100_sukodono.geojson",
          "id3515110_sidoarjo.geojson",
          "id3515120_buduran.geojson",
          "id3515130_sedati.geojson",
          "id3515140_waru.geojson",
          "id3515150_gedangan.geojson",
          "id3515160_taman.geojson",
          "id3515170_krian.geojson",
          "id3515180_balong_bendo.geojson"
        );
      }

      const geoJsons = await Promise.all(
        fileNames.map(async (fileName) => {
          try {
            const response = await fetch(`/${cityName}/${fileName}`);
            if (!response.ok) {
              console.error(
                `Failed to fetch ${fileName}: ${response.statusText}`
              );
              return null;
            }
            const data = await response.json();

            return {
              data,
              id: fileName.replace(".geojson", ""),
              name: data.name || extractDistrictName(fileName),
            };
          } catch (error) {
            console.error(`Error fetching ${fileName}:`, error);
            return null;
          }
        })
      );

      return geoJsons.filter((geoJson) => geoJson !== null);
    } catch (error) {
      console.error("Error fetching GeoJSON files:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const extractDistrictName = (fileName) => {
    const namePart = fileName
      .split("_")
      .slice(1)
      .join("_")
      .replace(".geojson", "");

    return namePart
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    fetchGeoJsonFiles(city).then((layers) => {
      setGeoJsonLayers(layers);
    });
  }, [city]);

  

  const getColorForFeature = (featureName) => {
    if (!bondDetail?.pollutantMap) return "#cccccc";

    const normalizedFeatureName = featureName.toLowerCase().trim();

    const pollutantData = bondDetail.pollutantMap.find(
      (item) =>
        item.name
          .toLowerCase()
          .trim()
          .replace(/'s village$/, "") === normalizedFeatureName
    );

    if (!pollutantData) return "#cccccc";

    return getPoluttantColor(pollutantData.value);
  };

  const getStyle = (feature) => {
    let featureName = "";

    if (feature.properties) {
      featureName = feature.properties.district;

      if (!featureName && feature.id) {
        featureName = extractDistrictName(feature.id);
      }
    }

    const fillColor = getColorForFeature(featureName);

    return {
      fillColor: fillColor,
      weight: 1,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.7,
      dashArray: "",
    };
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const districtName =
        feature.properties.district ||
        feature.properties.name ||
        feature.properties.village ||
        "Unknown";

      const pollutantData = bondDetail?.pollutantMap?.find(
        (item) =>
          item.name.toLowerCase().trim() === districtName.toLowerCase().trim()
      );

      let popupContent = `<div><strong>${districtName}</strong><br/>`;

      if (pollutantData) {
        popupContent += `<strong>Pollutant Value:</strong> ${pollutantData.value}<br/>`;
      }

      popupContent += Object.entries(feature.properties)
        .filter(([key]) => !["district", "name", "village"].includes(key))
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join("<br/>");

      popupContent += "</div>";

      layer.bindPopup(popupContent);

      layer.bindTooltip(districtName, {
        permanent: false,
        direction: "center",
        className: "leaflet-tooltip-district",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-48 w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {geoJsonLayers.map((geoJson) => (
          <GeoJSON
            key={geoJson.id}
            data={geoJson.data}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow z-1000">
        <div className="text-xs font-bold mb-1">Pollutant Level</div>
        <div className="flex items-center mb-1">
          <div
            className="w-4 h-4 mr-1"
            style={{ backgroundColor: "#e74c3c" }}
          ></div>
          <span className="text-xs">Very High (≥ {25})</span>
        </div>
        <div className="flex items-center mb-1">
          <div
            className="w-4 h-4 mr-1"
            style={{ backgroundColor: "#e67e22" }}
          ></div>
          <span className="text-xs">High</span>
        </div>
        <div className="flex items-center mb-1">
          <div
            className="w-4 h-4 mr-1"
            style={{ backgroundColor: "#f39c12" }}
          ></div>
          <span className="text-xs">Moderate</span>
        </div>
        <div className="flex items-center mb-1">
          <div
            className="w-4 h-4 mr-1"
            style={{ backgroundColor: "#f1c40f" }}
          ></div>
          <span className="text-xs">Low</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-1"
            style={{ backgroundColor: "#2ecc71" }}
          ></div>
          <span className="text-xs">Very Low (≤ {20})</span>
        </div>
      </div>
    </div>
  );
}
