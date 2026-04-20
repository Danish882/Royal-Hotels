import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail("");
      setTimeout(() => setJoined(false), 3000);
    }
  };

  const footerLinks = ["HOME", "BOOKINGS", "ROOMS", "CONTACT"];
  const linkPaths = ["/", "/#bookings", "/#rooms", "/#contact"];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Decorative lime glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-linear-to-r from-transparent via-lime-400 to-transparent" />

      {/* Background glow blobs */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-lime-400 rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-lime-400 rounded-full opacity-5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-16 flex flex-col gap-14">
        {/* TOP — Newsletter */}
        <div className="text-center">
          <p className="text-lime-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Exclusive Member Offers
          </p>
          <h2 className="text-4xl font-black mb-2">
            Sign Up For <span className="text-lime-400">Exclusive</span> Offers
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Get the best deals delivered straight to your inbox.
          </p>

          {joined ? (
            <div className="flex items-center justify-center gap-2 text-lime-400 font-bold text-lg animate-pulse">
              <span>✅</span> You're in! Welcome to Royal Hotels.
            </div>
          ) : (
            <form
              onSubmit={handleJoin}
              className="flex items-center justify-center max-w-lg mx-auto w-full group"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="grow px-6 py-4 bg-transparent border-2 border-r-0 border-lime-500 rounded-l-full outline-none text-sm text-white placeholder-gray-500 focus:border-lime-300 transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-300 text-black px-8 py-4 rounded-r-full font-black text-sm transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 active:scale-95"
              >
                Join Now
              </button>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800" />

        {/* BOTTOM — Brand + Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left — Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xs">R</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                ROYAL HOTELS
              </h2>
            </div>
            <p className="text-gray-500 text-xs max-w-xs mb-4">
              Where luxury meets comfort. Experience the finest hospitality.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 justify-center md:justify-start">
              {[
                { icon: <FaFacebook />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map((social, i) => (
                <button
                  key={i}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Nav Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <ul className="flex gap-6 flex-wrap justify-center md:justify-end">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={linkPaths[i]}
                    className="text-gray-400 hover:text-lime-400 text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative group"
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-2">
              <Link
                to="/login"
                className="text-xs font-bold border border-gray-700 text-gray-400 hover:border-lime-400 hover:text-lime-400 px-5 py-2 rounded-xl transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xs font-black bg-lime-400 text-black hover:bg-lime-300 px-5 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/20"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-4 border-t border-gray-900">
          <p className="text-gray-600 text-xs">
            &copy; 2026 ROYAL HOTELS. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Made with <span className="text-lime-600">♥</span> for luxury
            travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
