import React, { useEffect, useState } from "react";
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Sun,
  DollarSign,
  Users,
  TrendingUp,
  Cpu,
  BarChart3,
  CloudSun,
  LineChart,
  Globe,
  PieChart,
} from "lucide-react";
import Navbar from "../components/LandingPage/Navbar";
import { useParams } from "react-router-dom";
import useGreenCreditStore from "../store/greenCreditStore";
import { formatCurrency } from "../utils/functions";
import Footer from "../components/LandingPage/Footer";

const GreenCreditDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { fetchCredits, creditDetail } = useGreenCreditStore();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const percentage =
    Math.floor((creditDetail.fundRaised / creditDetail.fundRequired) * 100) +
    "%";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCredits(id);
      } catch (error) {
        console.error("Error fetching credit details:", error);
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

  const umkmData = {
    name: "Kopi Lestari Nusantara",
    location: "Bandung, Jawa Barat",
    fundingStatus: 70,
    fundingTarget: "Rp 250.000.000",
    fundingCollected: "Rp 175.000.000",
    description:
      "Kopi Lestari Nusantara adalah usaha kopi yang menggunakan metode agroforestri untuk menanam kopi di bawah naungan pohon asli, menciptakan ekosistem yang berkelanjutan dan menjaga keanekaragaman hayati lokal.",
    impact:
      "Setiap hektar kebun kopi kami menyerap hingga 15 ton CO₂ per tahun dan menjaga keberadaan 25+ spesies tanaman lokal. Kami juga menggunakan metode pengolahan kopi yang hemat air, menghemat hingga 80% air dibanding metode konvensional.",
    images: [
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
    ],
    emission: {
      current: 12,
      projection: 5,
      reduction: 58,
      location: {
        lat: -6.9175,
        lng: 107.6191,
        radius: 5, // km
      },
    },
    land: {
      fertility: 80,
      reforestationPotential: 75,
      ndviIndex: 0.68, // 0 to 1 scale
      ndviChange: 0.15, // Improvement in NDVI
    },
    roi: {
      percentage: 15,
      bep: 24, // months
      dividend: "Rp 50.000",
      monthlyIncome: "Rp 125.000",
      annualIncome: "Rp 1.500.000",
      estimatedTotalReturn: "Rp 4.500.000",
    },
    sustainability: {
      score: "A",
      technologies: ["Solar", "Water Conservation", "Organic"],
    },
    technology: {
      score: "A+",
      systems: [
        { name: "Smart Irrigation", efficiency: 85, roi: 18 },
        { name: "Solar Processing", efficiency: 92, roi: 15 },
        { name: "Water Recycling", efficiency: 78, roi: 12 },
        { name: "IoT Monitoring", efficiency: 90, roi: 20 },
      ],
      certifications: ["ISO 14001", "Rainforest Alliance", "USDA Organic"],
      co2Reduction: "58%",
      waterSaving: "76%",
    },
    marketingPlan: {
      channels: [
        { name: "Direct B2B", percentage: 45 },
        { name: "Export Markets", percentage: 30 },
        { name: "Online Retail", percentage: 15 },
        { name: "Local Markets", percentage: 10 },
      ],
      strategies: [
        "Vertical Market Integration",
        "Farm-to-Cup Traceability",
        "Sustainable Packaging",
        "Carbon Neutral Shipping",
        "Local Community Partnerships",
      ],
      growthRate: 28,
      projectedSales: "Rp 1.250.000.000",
      marketShare: 8.5,
    },
    insight: {
      investmentAmount: "Rp 1.000.000",
      trees: 10,
      co2Reduction: "500kg",
      waterSaved: "12.000L",
      dividendReturn: "Rp 1.500.000",
    },
    team: [
      {
        name: "Budi Santoso",
        role: "Founder & CEO",
        image: "/api/placeholder/100/100",
      },
      {
        name: "Siti Rahma",
        role: "Head of Agriculture",
        image: "/api/placeholder/100/100",
      },
      {
        name: "Dian Permata",
        role: "Finance Officer",
        image: "/api/placeholder/100/100",
      },
    ],
    recommendations: [
      {
        id: 1,
        name: "Padi Organik Sejahtera",
        location: "Yogyakarta",
        image: "/api/placeholder/200/150",
        fundingStatus: 45,
      },
      {
        id: 2,
        name: "TebuHijau",
        location: "Malang, Jawa Timur",
        image: "/api/placeholder/200/150",
        fundingStatus: 82,
      },
      {
        id: 3,
        name: "Sayur Hidroponik Maju",
        location: "Bogor, Jawa Barat",
        image: "/api/placeholder/200/150",
        fundingStatus: 29,
      },
    ],
  };

  // Function to calculate ROI metrics based on the investment amount
  const calculateROI = (amount) => {
    const investmentAmount = amount || 1000000; // Default to 1 million if no amount provided
    const monthlyReturn = (investmentAmount * (creditDetail.roi / 100)) / 12;
    const annualReturn = investmentAmount * (creditDetail.roi / 100);
    const totalReturn = annualReturn * 3; // Assuming 3-year investment period

    return {
      monthly: formatCurrency(monthlyReturn),
      annual: formatCurrency(annualReturn),
      total: formatCurrency(totalReturn),
      bep: Math.ceil(investmentAmount / monthlyReturn),
    };
  };

  // Calculate ROI based on a standard investment amount
  const roiMetrics = calculateROI(1000000); // ROI for 1 million Rupiah investment

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === umkmData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? umkmData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto p-4 pt-20 ">
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <span>Beranda</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span>UMKM Berkelanjutan</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-teal-700">{creditDetail.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-7 bg-white rounded-lg overflow-hidden shadow-sm relative">
            <div className="relative h-64 md:h-96">
              <img
                // src={umkmData.images[currentSlide]}
                src="https://picsum.photos/800/400"
                alt={`${creditDetail.name} - Image ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                {creditDetail.images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentSlide ? "bg-teal-700" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {creditDetail.name}
              </h1>

              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{creditDetail.location || 'Jakarta Raya'}</span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Funding Progress</p>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-teal-700 h-4 rounded-full"
                    style={{ width: `${creditDetail.fund_percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm font-medium text-teal-700">
                    {percentage} funded
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatCurrency(creditDetail.fundRaised)} /{" "}
                    {formatCurrency(creditDetail.fundRequired)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full py-3 bg-teal-700 text-white font-medium rounded-md hover:bg-teal-800 transition">
                  Danai Sekarang
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="py-2 border border-teal-700 text-teal-700 rounded-md hover:bg-teal-50 transition">
                  Bagikan
                </button>
                <button className="py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">About Green Projects</h2>
              <p className="text-gray-600">{creditDetail.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">
                How can this project giving an impact?
              </h2>
              <p className="text-gray-600">{creditDetail.green_impact}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-lg shadow-md p-6 mb-8 text-white">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-medium">Investation Insights</h2>
          </div>
          <p className="text-lg mb-4">
            With investation amount of{" "}
            <span className="font-bold">
              {umkmData.insight.investmentAmount}
            </span>
            , You can contribute to{" "}
            <span className="font-bold">{umkmData.insight.trees} Tree</span>,
            reducing{" "}
            <span className="font-bold">{umkmData.insight.co2Reduction}</span>{" "}
            CO₂ emition, dan menghemat{" "}
            <span className="font-bold">{umkmData.insight.waterSaved}</span>{" "}
            air.
          </p>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-lg">
              Dividen projection that you will get{" "}
              <span className="font-bold text-xl">{roiMetrics.total}</span> in 3
              Years.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <DollarSign className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">ROI & Dividen Potential</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-teal-50 p-2 rounded">
                <p className="text-sm text-gray-500">ROI</p>
                <p className="text-xl font-bold text-teal-700">
                  {creditDetail.roi}%
                </p>
                <p className="text-xs text-gray-500">per tahun</p>
              </div>
              <div className="bg-teal-50 p-2 rounded">
                <p className="text-sm text-gray-500">BEP</p>
                <p className="text-xl font-bold text-teal-700">
                  {roiMetrics.bep}
                </p>
                <p className="text-xs text-gray-500">bulan</p>
              </div>
              <div className="bg-teal-50 p-2 rounded">
                <p className="text-sm text-gray-500">Dividen</p>
                <p className="text-xl font-bold text-teal-700">
                  {umkmData.roi.dividend}
                </p>
                <p className="text-xs text-gray-500">per lembar</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">
                  Monthly Income Estimation:
                </span>
                <span className="font-medium">{roiMetrics.monthly}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Yearly Income Estimation:</span>
                <span className="font-medium">{roiMetrics.annual}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Sun className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Sustainability</h3>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Sustainability Score</p>
              <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center">
                <span className="text-white font-bold">
                  {umkmData.sustainability.score}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {umkmData.sustainability.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
            <div className="flex items-center mb-3">
              <Cpu className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Technology</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-500">Technology Score</p>
                  <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {umkmData.technology.score}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">
                    Environmental Impact
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-teal-50 p-2 rounded flex flex-col items-center">
                      <CloudSun className="w-4 h-4 text-teal-700 mb-1" />
                      <p className="text-xs text-gray-500">CO₂ Reduction</p>
                      <p className="text-lg font-bold text-teal-700">
                        {umkmData.technology.co2Reduction}
                      </p>
                    </div>
                    <div className="bg-teal-50 p-2 rounded flex flex-col items-center">
                      <Globe className="w-4 h-4 text-teal-700 mb-1" />
                      <p className="text-xs text-gray-500">Water Saving</p>
                      <p className="text-lg font-bold text-teal-700">
                        {umkmData.technology.waterSaving}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {umkmData.technology.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Implemented Systems</p>
                <div className="space-y-2">
                  {umkmData.technology.systems.map((system, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{system.name}</p>
                        <p className="text-xs text-teal-700">
                          ROI: {system.roi}%
                        </p>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${system.efficiency}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        Efficiency: {system.efficiency}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Marketing Plan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Market Channels</p>
                    <p className="text-sm text-teal-700">
                      Growth Rate:{" "}
                      <span className="font-bold">
                        {umkmData.marketingPlan.growthRate}%
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    {umkmData.marketingPlan.channels.map((channel, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded">
                        <div className="flex justify-between">
                          <p className="text-sm">{channel.name}</p>
                          <p className="text-sm font-medium">
                            {channel.percentage}%
                          </p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-600 h-2 rounded-full"
                            style={{ width: `${channel.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-teal-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-500">Projected Sales</p>
                    <p className="text-lg font-bold text-teal-700">
                      {umkmData.marketingPlan.projectedSales}
                    </p>
                  </div>
                  <div className="bg-teal-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-500">Market Share</p>
                    <p className="text-lg font-bold text-teal-700">
                      {umkmData.marketingPlan.marketShare}%
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Marketing Strategies</p>
                <div className="space-y-2">
                  {umkmData.marketingPlan.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-50 p-2 rounded"
                    >
                      <LineChart className="w-4 h-4 text-teal-700" />
                      <p className="text-sm">{strategy}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-teal-50 rounded">
                  <p className="text-sm font-medium text-center text-teal-700">
                    Marketing focuses on sustainable positioning and traceable
                    sourcing to capture premium market segments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-teal-700 mr-2" />
            <h2 className="text-lg font-medium">Team & Owner</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {umkmData.team.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GreenCreditDetail;
