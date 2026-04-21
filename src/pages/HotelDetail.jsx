import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaConciergeBell,
  FaSwimmingPool,
  FaTv,
  FaUtensils,
  FaWifi,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const amenities = [
  { icon: <FaWifi />, label: "Free Wi-Fi" },
  { icon: <FaTv />, label: "Cable TV" },
  { icon: <FaUtensils />, label: "Restaurant" },
  { icon: <FaSwimmingPool />, label: "Swimming Pool" },
  { icon: <FaConciergeBell />, label: "Room Service" },
];

const HotelDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const backendUrl = "https://royal-hotels-one.vercel.app";

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hotel/rooms/${id}`);
        setRoom(response.data.hotel);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/reservation/create`,
        {
          name,
          email,
          phone,
          checkin,
          checkout,
          guests: String(guests),
          roomName: room.name,
          roomId: room._id,
        },
      );
      if (response.data.message === "Reservation created succesfully") {
        setBookingSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center p-6 sm:p-10">Loading...</p>;
  if (!room) return <p className="text-center p-6 sm:p-10">Room not found</p>;

  const addedDate = new Date(room.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-1">
          <FaMapMarkerAlt className="text-lime-500" /> Royal Hotels · Rooms
        </p>

        <img
          src={room.image}
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-2xl shadow-lg"
          alt={room.name}
        />

        <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">
              {room.name}
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {room.description}
            </p>
          </div>
          <div className="text-left md:text-right mt-3 md:mt-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-lime-500">
              ${room.price}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">per night</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
          ))}
          <span className="text-xs sm:text-sm text-gray-500 ml-1">
            5.0 · Luxury Suite
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-400 text-[10px] sm:text-xs">
          <FaCalendarAlt className="text-lime-400" />
          <span>Listed on: {addedDate}</span>
        </div>

        <div className="w-full h-px bg-gray-200 my-6 sm:my-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                About This Room
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {room.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs sm:text-sm font-medium"
                  >
                    <span className="text-lime-500 text-sm">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                Pricing
              </h2>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100 text-sm">
                <span className="text-gray-500">Per Night</span>
                <span className="text-gray-900 font-bold">${room.price}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100 text-sm">
                <span className="text-gray-500">Taxes & Fees</span>
                <span className="text-lime-600 font-semibold">Included</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 text-sm">
                <span className="text-gray-500">Cancellation</span>
                <span className="text-lime-600 font-semibold">Free</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 sticky top-4 sm:top-6">
              {/* FORM same, only spacing improved */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                Book Your Stay
              </h2>

              <form onSubmit={handleBooking} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border p-2 sm:p-3 rounded-xl text-sm"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border p-2 sm:p-3 rounded-xl text-sm"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <input
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="w-full border p-2 sm:p-3 rounded-xl text-sm"
                  />
                  <input
                    type="date"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="w-full border p-2 sm:p-3 rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-lime-500 text-white p-2 sm:p-3 rounded-xl text-sm"
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
