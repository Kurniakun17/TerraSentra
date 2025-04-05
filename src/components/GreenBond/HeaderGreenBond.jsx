import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import React, { useState } from "react";
import useGreenBondStore from "../../store/greenBondStore";

export default function HeaderGreenBond() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { bondDetail } = useGreenBondStore();
  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };
  const percentage =
    Math.floor((bondDetail.fundRaised / bondDetail.fundRequired) * 100) + "%";

  const projectImages = [
    "/api/placeholder/900/500",
    "/api/placeholder/900/500",
    "/api/placeholder/900/500",
  ];

  const handlePrevSlide = () => {
    setActiveSlide(
      activeSlide === 0 ? projectImages.length - 1 : activeSlide - 1
    );
  };

  const handleNextSlide = () => {
    setActiveSlide(
      activeSlide === projectImages.length - 1 ? 0 : activeSlide + 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{bondDetail?.name}</h1>
      <div className="flex items-center mt-2 text-gray-600">
        <MapPin className="w-5 h-5 mr-1" />
        <span>{bondDetail.location}</span>
      </div>

      <div className="mt-6 relative">
        <div className="rounded-lg overflow-hidden">
          <img
            src={"https://picsum.photos/800/400"}
            alt={`Project image ${activeSlide + 1}`}
            className="w-full h-96 object-cover"
          />
        </div>

        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex justify-center mt-4">
          {projectImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`mx-1 w-3 h-3 rounded-full ${
                activeSlide === index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-2/4 pr-4">
          <p className="text-lg font-medium text-gray-700 mb-2">
            Funding Status
          </p>
          <div className="w-full bg-gray-200 rounded-full h-5">
            <div
              className="bg-primary h-5 rounded-full"
              style={{
                width: percentage,
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Rp. 1,750,000</span>
            <span className="text-primary font-bold">{percentage} of Rp. 2,500,000</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="w-full md:w-auto mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-md transition duration-300">
            Fund Now
          </button>

          <button className="w-full md:w-auto mt-4 md:mt-0 border border-primary hover:bg-primary/10 font-bold py-4 px-8 rounded-lg text-lg text-primary transition duration-300">
            Monitor & Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}
