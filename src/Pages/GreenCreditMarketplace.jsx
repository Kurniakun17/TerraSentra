import React, { useState, useEffect } from "react";
import { Search, MapPin, Filter } from "lucide-react";

import Navbar from "../components/LandingPage/Navbar";
import { GreenBondCard } from "../components/shared/GreenBondCard";

const GreenCreditMarketplace = () => {
  const sampleBonds = [
    {
      id: 1,
      name: "Solar Power Plant",
      description:
        "Renewable energy project to reduce carbon emissions through solar technology.",
      location: "Jakarta, Indonesia",
      fundRaised: 750000000,
      fundRequired: 1000000000,
    },
    {
      id: 2,
      name: "Mangrove Restoration",
      description:
        "Ecological restoration project to protect coastal areas and sequester carbon.",
      location: "Sidoarjo, Indonesia",
      fundRaised: 450000000,
      fundRequired: 800000000,
    },
    {
      id: 3,
      name: "Sustainable Waste Management",
      description:
        "Waste-to-energy facility to reduce landfill usage and generate clean energy.",
      location: "Surabaya, Indonesia",
      fundRaised: 600000000,
      fundRequired: 900000000,
    },
    {
      id: 4,
      name: "Green Transportation Initiative",
      description:
        "Electric public transportation network to reduce urban carbon footprint.",
      location: "Jakarta, Indonesia",
      fundRaised: 1200000000,
      fundRequired: 2000000000,
    },
    {
      id: 5,
      name: "Organic Farming Cooperative",
      description:
        "Supporting local farmers in transitioning to sustainable agricultural practices.",
      location: "Sidoarjo, Indonesia",
      fundRaised: 320000000,
      fundRequired: 500000000,
    },
    {
      id: 6,
      name: "Green Building Retrofit",
      description:
        "Upgrading commercial buildings to improve energy efficiency and sustainability.",
      location: "Surabaya, Indonesia",
      fundRaised: 850000000,
      fundRequired: 1200000000,
    },
  ];

  const [bonds, setBonds] = useState([]);
  const [filteredBonds, setFilteredBonds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const locations = [
    "Jakarta, Indonesia",
    "Sidoarjo, Indonesia",
    "Surabaya, Indonesia",
  ];

  useEffect(() => {
    setBonds(sampleBonds);
    setFilteredBonds(sampleBonds);
  }, []);

  useEffect(() => {
    let result = [...bonds];

    if (searchTerm) {
      result = result.filter((bond) =>
        bond.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      result = result.filter((bond) => bond.location === selectedLocation);
    }

    setFilteredBonds(result);
  }, [searchTerm, selectedLocation, bonds]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full h-16"></div>
      {/* Hero Section */}
      <div className="bg-primary text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Green Credit Marketplace
          </h1>
          <p className="mt-4 text-white max-w-3xl">
            Invest in sustainable projects that deliver environmental benefits
            alongside financial returns. Support climate action and sustainable
            development through Green Credit.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex justify-center flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Search Green Bonds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={toggleFilter}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Location
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="rounded-md border-gray-300 border focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Green Bonds Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBonds.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredBonds.length} green bonds
              {selectedLocation && <span> in {selectedLocation}</span>}
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBonds.map((bond) => (
                <GreenBondCard key={bond.id} bond={bond} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No green bonds match your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenCreditMarketplace;
[
  { name: "ciracas", score: 70 },
  { name: "cibubur", score: 80 },
  { name: "cileungsi", score: 90 },
  { name: "cikarang", score: 85 },
  { name: "cimanggis", score: 75 },
];
