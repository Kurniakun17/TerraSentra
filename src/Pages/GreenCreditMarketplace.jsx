import React, { useState, useEffect } from "react";
import { Search, MapPin, Filter } from "lucide-react";

import Navbar from "../components/LandingPage/Navbar";
import { GreenBondCard } from "../components/shared/GreenBondCard";
import useGreenCreditStore from "../store/greenCreditStore";
import { GreenCreditCard } from "../components/GreenCredit/GreenCreditCard";

const GreenCreditMarketplace = () => {
  const {
    credits: listCredits,
    fetchFeaturedCredits,
    loading,
  } = useGreenCreditStore();

  const [filteredCredits, setFilteredCredits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique locations from the credits data
  const locations = [
    ...new Set(listCredits?.map((credit) => credit.location) || []),
  ];

  // Fetch credits on component mount
  useEffect(() => {
    fetchFeaturedCredits();
  }, [fetchFeaturedCredits]);

  // Filter credits based on search term and selected location
  useEffect(() => {
    if (!listCredits) return;

    let result = [...listCredits];

    if (searchTerm) {
      result = result.filter((credit) =>
        credit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      result = result.filter((credit) => credit.location === selectedLocation);
    }

    setFilteredCredits(result);
  }, [searchTerm, selectedLocation, listCredits]);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
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

            <button
              onClick={toggleFilter}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading green credits...</p>
          </div>
        ) : filteredCredits && filteredCredits.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredCredits.length} green credits
              {selectedLocation && <span> in {selectedLocation}</span>}
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCredits.map((credit) => (
                <GreenCreditCard credit={credit} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              {listCredits && listCredits.length > 0
                ? "No green credits match your search criteria."
                : "No green credits available."}
            </p>
            {(searchTerm || selectedLocation) && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenCreditMarketplace;
