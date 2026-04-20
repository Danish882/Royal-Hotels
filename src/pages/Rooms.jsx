import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaTv,
  FaUtensils,
  FaSwimmingPool,
  FaConciergeBell,
} from "react-icons/fa";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const backendUrl = "https://royal-hotels-one.vercel.app";

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hotel/list`);
        setRooms(response.data.hotels);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms =
    filter === "all"
      ? rooms
      : rooms.filter((room) => {
          if (filter === "luxury") return room.price > 150;
          if (filter === "budget") return room.price < 200;
          return true;
        });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-black via-gray-900 to-black py-24 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 px-4 py-2 rounded-full mb-6">
            <FaMapMarkerAlt className="text-lime-400 text-sm" />
            <span className="text-lime-400 text-xs font-bold uppercase tracking-wider">
              Luxury Accommodations
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Our <span className="text-lime-400">Rooms</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience unparalleled comfort and elegance in our carefully
            designed rooms
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Filter:
              </span>
              <div className="flex gap-2">
                {["all", "luxury", "budget"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                      filter === f
                        ? "bg-lime-400 text-black shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredRooms.length} Room{filteredRooms.length !== 1 ? "s" : ""}{" "}
              Available
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Rooms Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span className="text-lime-400 font-bold text-lg">
                      ${room.price}
                    </span>
                    <span className="text-white text-xs ml-1">/night</span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-lime-500 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { icon: <FaWifi />, label: "WiFi" },
                      { icon: <FaTv />, label: "TV" },
                      { icon: <FaUtensils />, label: "Food" },
                    ].map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg"
                      >
                        <span className="text-lime-500">{amenity.icon}</span>
                        {amenity.label}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/room/${room._id}`}
                    className="block w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-center py-3 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
