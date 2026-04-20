import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { Link } from "react-router-dom";
import { FaBath, FaBed, FaUserFriends, FaWifi } from "react-icons/fa";

const amenitiesList = [
  { label: "1-2 Persons", icon: <FaUserFriends className="text-gray-600" /> },
  { label: "Bathtub", icon: <FaBath className="text-gray-600" /> },
  { label: "King Size Bed", icon: <FaBed className="text-gray-600" /> },
  { label: "Free Wifi", icon: <FaWifi className="text-gray-600" /> },
];

const HotelList = () => {
  const { rooms } = useContext(RoomContext);

  return (
    <div className="bg-[#f7f0eb] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">
          Book your stay <br />
          relax in luxury
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => {
            return (
              <div
                key={room._id} // ✅ FIXED
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                {/* IMAGE CLICK → DETAIL PAGE */}
                <Link to={`/rooms/${room._id}`}>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-80 object-cover cursor-pointer"
                  />
                </Link>

                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                    {room.name}
                  </h3>

                  <p className="text-gray-600 text-lg mb-4">${room.price}</p>

                  <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
                    {amenitiesList.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {amenity.icon}
                        <span>{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Rooms are not available!!
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
