import React from "react";
import {
  FaBath,
  FaCar,
  FaCocktail,
  FaConciergeBell,
  FaShuttleVan,
  FaSwimmingPool,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShuttleVan size={32} />,
    title: "Pick Up & Drop",
    disc: "We'll pick u fromthe airport while you comfy on your ride",
  },
  {
    icon: <FaCar size={32} />,
    title: "Parking Space",
    disc: "Secure and convenient parking available for your vehicle",
  },
  {
    icon: <FaCocktail size={32} />,
    title: "Welcome Drink",
    disc: "Enjoy a refreshing complimentary drink upon arrival",
  },
  {
    icon: <FaSwimmingPool size={32} />,
    title: "Swimming Pool",
    disc: "Relax and unwind in our clean and refreshing swimming pool",
  },
  {
    icon: <FaBath size={32} />,
    title: "Hot and Cold Water",
    disc: "24/7 access to both hot and cold water for your comfort",
  },
  {
    icon: <FaConciergeBell size={32} />,
    title: "Full Board",
    disc: "Enjoy complete daily meals including breakfast, lunch, and dinner",
  },
];
const Facility = () => {
  return (
    <div className="bg-[#f8f0eb] py-16 px-4 md:px-20">
      <div className="mx-auto max-w-7x1">
        <div className="mb-12">
          <p className="text-sm tracking-widest uppercase text-gray-500">
            Services
          </p>
          <h2 className="text-4xl font-serif font-semibold text-gray-800 ">
            Facilities & Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-start space-y-3">
              <div className="bg-lime-400 rounded-full p-5 text-black">
                {service.icon}
              </div>
              <h3 className="text-2x1 font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-500 max-w-xs text-sm">{service.disc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facility;
