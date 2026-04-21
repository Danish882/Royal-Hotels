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
  const linkPaths = ["/", "/bookings", "/rooms", "/contact"];

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
