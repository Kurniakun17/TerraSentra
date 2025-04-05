import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Clock, Info, ChartBar } from "lucide-react";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";
import HeaderGreenBond from "../components/GreenBond/HeaderGreenBond";
import AboutGreenBond from "../components/GreenBond/AboutGreenBond";
import BannerInsight from "../components/GreenBond/BannerInsight";
import ROICalculator from "../components/GreenBond/ROICalculator";
import CTAGreenBond from "../components/GreenBond/CTAGreenBond";
import AdditionalInfo from "../components/GreenBond/AdditionalInfo";
import SocialImpact from "../components/GreenBond/SocialImpact";
import FAQGreenBond from "../components/GreenBond/FAQGreenBond";
import OrderBook from "../components/GreenBond/OrderBook";
import CarbonCreditSection from "../components/GreenBond/CarbonCreditSection";
import useGreenBondStore from "../store/greenBondStore";
import { useParams } from "react-router-dom";

export default function GreenBondDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const { fetchBonds, bondDetail } = useGreenBondStore();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchBonds({ id });
      } catch (error) {
        console.error("Error fetching bond details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="w-full h-16"></div>
        <div className="max-w-6xl mx-auto p-6">
          <HeaderGreenBond />

          <AboutGreenBond description="This project focuses on reforestation in East Sumba, Indonesia, aiming to restore 1,000 hectares of degraded land. The project will plant native species and improve local biodiversity while providing economic benefits to the community through sustainable forestry practices." />

          <div className=" rounded-lg  mb-6 overflow-hidden">
            <div className="flex bg-white justify-center p-4 ">
              <div className="inline-flex bg-gray-100 p-1 rounded-full">
                <button
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "overview"
                      ? "bg-tertiary text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Overview & Impact
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "market"
                      ? "bg-tertiary text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("market")}
                >
                  <ChartBar className="w-4 h-4 mr-2" />
                  Market & Investment
                </button>
              </div>
            </div>

            <div className="py-4">
              {activeTab === "overview" ? (
                <>
                  <CarbonCreditSection />
                  <BannerInsight />
                  <SocialImpact />
                  <AdditionalInfo />
                  <FAQGreenBond />
                </>
              ) : (
                <>
                  <ROICalculator />
                  <OrderBook />
                </>
              )}
            </div>
          </div>

          <CTAGreenBond />

          <div className="w-full h-16"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
