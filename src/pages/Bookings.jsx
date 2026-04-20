import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const backendUrl = "https://royal-hotels-one.vercel.app";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reservation/list`);
      setBookings(response.data.reservations);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    setDeleteLoading(id);
    try {
      await axios.post(`${backendUrl}/api/reservation/remove`, { id });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      console.log("Error deleting booking:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-linear-to-br from-black via-gray-900 to-black py-24 px-4">
        <div className="absolute inset-0 opacity-20"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 px-4 py-2 rounded-full mb-6">
            <FaCheckCircle className="text-lime-400 text-sm" />
            <span className="text-lime-400 text-xs font-bold uppercase tracking-wider">
              Manage Reservations
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Your <span className="text-lime-400">Bookings</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            View and manage all your hotel reservations
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📅</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Bookings Yet
            </h3>

            <p className="text-gray-500 mb-6">
              You haven't made any reservations
            </p>

            {/* ✅ FIXED ANCHOR TAG */}
            <a
              href="/rooms"
              className="inline-block bg-lime-400 hover:bg-lime-500 text-black font-bold px-8 py-3 rounded-xl transition-all"
            >
              Browse Rooms
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                        <FaBed className="text-lime-600 text-xl" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {booking.roomName}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <FaUser className="text-lime-500" />
                            {booking.name}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaEnvelope className="text-lime-500" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaPhone className="text-lime-500" />
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pl-16">
                      <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-gray-500">Check-in</div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <FaCalendarAlt className="text-lime-500 text-xs" />
                          {formatDate(booking.checkin)}
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-gray-500">Check-out</div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <FaCalendarAlt className="text-lime-500 text-xs" />
                          {formatDate(booking.checkout)}
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-gray-500">Guests</div>
                        <div className="font-semibold">
                          {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <div className="bg-lime-50 border border-lime-200 px-4 py-2 rounded-lg">
                      <div className="text-xs text-lime-700 font-semibold uppercase">
                        Confirmed
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(booking._id)}
                      disabled={deleteLoading === booking._id}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2"
                    >
                      <FaTrash className="text-xs" />
                      {deleteLoading === booking._id
                        ? "Canceling..."
                        : "Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
