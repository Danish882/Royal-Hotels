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

// Fixed amenities — model mein nahi hain toh static rakhte hain
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

  // Booking form state
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const backendUrl = "http://localhost:4000"; // same as before

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hotel/rooms/${id}`);
        console.log("API RESPONSE:", response.data); // same as before
        setRoom(response.data.hotel); // same as before
      } catch (error) {
        console.log("Error:", error); // same as before
      } finally {
        setLoading(false); // same as before
      }
    };
    fetchRoom();
  }, [id]);

  // Booking submit handler
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

  // Same as before
  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!room) return <p className="text-center p-10">Room not found</p>;

  // Date format helper — room.date (timestamp) ko readable banao
  const addedDate = new Date(room.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1">
          <FaMapMarkerAlt className="text-lime-500" /> Royal Hotels · Rooms
        </p>

        {/* ── SAME AS BEFORE — IMAGE ── */}
        <img
          src={room.image}
          className="w-full h-80 object-cover rounded-2xl shadow-lg"
          alt={room.name}
        />

        {/* ── SAME AS BEFORE — NAME, DESC, PRICE ── */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold mt-4">{room.name}</h1>
            <p className="text-gray-600 mt-2">{room.description}</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <h2 className="text-3xl font-bold text-lime-500">${room.price}</h2>
            <p className="text-sm text-gray-400">per night</p>
          </div>
        </div>

        {/* Star Rating — additional */}
        <div className="flex items-center gap-2 mt-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
          <span className="text-sm text-gray-500 ml-1">5.0 · Luxury Suite</span>
        </div>

        {/* Date Added — from room.date (DB field) */}
        <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs">
          <FaCalendarAlt className="text-lime-400" />
          <span>Listed on: {addedDate}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-8" />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Amenities */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                About This Room
              </h2>
              <p className="text-gray-500 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-700 text-sm font-medium"
                  >
                    <span className="text-lime-500 text-base">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Pricing
              </h2>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Per Night</span>
                <span className="text-gray-900 font-bold text-xl">
                  ${room.price}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Taxes & Fees</span>
                <span className="text-lime-600 font-semibold text-sm">
                  Included
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 text-sm">Cancellation</span>
                <span className="text-lime-600 font-semibold text-sm">
                  Free
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-6">
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Your reservation has been placed successfully.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="mt-6 w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-3 rounded-xl transition-all text-sm uppercase tracking-wider"
                  >
                    Book Again
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Book Your Stay
                  </h2>
                  <p className="text-sm text-gray-400 mb-5">
                    Fill in your details to reserve.
                  </p>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 0000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                          Check-In
                        </label>
                        <input
                          type="date"
                          value={checkin}
                          onChange={(e) => setCheckin(e.target.value)}
                          required
                          className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                          Check-Out
                        </label>
                        <input
                          type="date"
                          value={checkout}
                          onChange={(e) => setCheckout(e.target.value)}
                          required
                          className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-lime-50 border border-lime-100 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Room rate</span>
                        <span className="font-semibold text-gray-800">
                          ${room.price} / night
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Taxes & fees</span>
                        <span>Included</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full bg-lime-500 hover:bg-lime-400 active:scale-95 text-white font-semibold p-3 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-60"
                    >
                      {bookingLoading ? "Booking..." : "Confirm Booking"}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Free cancellation · No credit card required
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
