import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/hero2.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/rooms");
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-40 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-lg mb-4 tracking-widest uppercase animate-fade-in">
          Where Luxury Meets Comfort
        </h2>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          ROYAL <span className="text-lime-400">HOTELS</span>
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-2xl">
          Experience world-class hospitality with our premium rooms and
          exceptional service
        </p>
        <button
          onClick={handleBookNow}
          className="bg-lime-400 hover:bg-lime-500 text-black font-black py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 active:scale-95 uppercase tracking-wider"
        >
          Book Your Stay
        </button>
      </div>
    </div>
  );
};

export default Hero;
