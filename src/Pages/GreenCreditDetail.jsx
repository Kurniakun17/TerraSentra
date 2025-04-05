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
} from "lucide-react";
import Navbar from "../components/LandingPage/Navbar";
import { useParams } from "react-router-dom";
import useGreenCreditStore from "../store/greenCreditStore";
import { formatCurrency } from "../utils/functions";

const GreenCreditDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { fetchCredits, creditDetail } = useGreenCreditStore();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
                <span>{creditDetail.location}</span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Progress Pendanaan</p>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-teal-700 h-4 rounded-full"
                    style={{ width: `${creditDetail.fund_percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm font-medium text-teal-700">
                    {creditDetail.fundRaised}% terdanai
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
              <h2 className="text-lg font-medium mb-3">Tentang UMKM</h2>
              <p className="text-gray-600">{creditDetail.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">
                Bagaimana proyek ini membantu lingkungan?
              </h2>
              <p className="text-gray-600">{creditDetail.green_impact}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-lg shadow-md p-6 mb-8 text-white">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-medium">Wawasan Investasi</h2>
          </div>
          <p className="text-lg mb-4">
            Dengan investasi sebesar{" "}
            <span className="font-bold">
              {umkmData.insight.investmentAmount}
            </span>
            , Anda berkontribusi menanam{" "}
            <span className="font-bold">{umkmData.insight.trees} pohon</span>,
            mengurangi{" "}
            <span className="font-bold">{umkmData.insight.co2Reduction}</span>{" "}
            emisi CO₂, dan menghemat{" "}
            <span className="font-bold">{umkmData.insight.waterSaved}</span>{" "}
            air.
          </p>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-lg">
              Proyeksi dividen yang Anda dapatkan adalah{" "}
              <span className="font-bold text-xl">
                {umkmData.insight.dividendReturn}
              </span>{" "}
              dalam 3 tahun.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <DollarSign className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Potensi ROI & Dividen</h3>
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
                  {umkmData.roi.bep}
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
                  Estimasi Pendapatan Bulanan:
                </span>
                <span className="font-medium">
                  {formatCurrency(
                    ((creditDetail.roi / 100) * creditDetail.fundRequired) / 12
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Estimasi Pendapatan Tahunan:
                </span>
                <span className="font-medium">
                  {formatCurrency(
                    (creditDetail.roi / 100) * creditDetail.fundRequired
                  )}
                </span>
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
              <Sun className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Technology</h3>
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
              <DollarSign className="w-5 h-5 text-teal-700 mr-2" />
              <h3 className="font-medium">Marketing Plan</h3>
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
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-teal-700 mr-2" />
            <h2 className="text-lg font-medium">Tim & Pendiri</h2>
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

      <footer className="bg-teal-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TerraSentra</h3>
              <p className="text-teal-100 text-sm">
                Platform pendanaan untuk UMKM berkelanjutan yang berfokus pada
                pelestarian lingkungan dan pertumbuhan ekonomi hijau.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Tentang Kami</h3>
              <ul className="space-y-2 text-teal-100 text-sm">
                <li>Tentang TerraSentra</li>
                <li>Cara Kerja</li>
                <li>Karir</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-teal-100 text-sm">
                <li>Pusat Bantuan</li>
                <li>Kontak</li>
                <li>FAQ</li>
                <li>Syarat & Ketentuan</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hubungi Kami</h3>
              <ul className="space-y-2 text-teal-100 text-sm">
                <li>info@terrasentra.id</li>
                <li>+62 21 1234 5678</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-teal-700 text-center text-teal-100 text-sm">
            © {new Date().getFullYear()} TerraSentra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GreenCreditDetail;
