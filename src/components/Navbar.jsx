import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleNavClick = (to) => {
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      if (location.pathname !== path) {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(to);
    }
  };

  const navLinks = [
    { label: "HOME", to: "/" },
    { label: "ROOMS", to: "/rooms" },
    { label: "BOOKINGS", to: "/bookings" },
    { label: "CONTACT", to: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 py-3"
          : "bg-black/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <span className="text-black font-black text-sm">R</span>
          </div>
          <h2 className="font-black text-2xl text-white tracking-tight">
            ROYAL{" "}
            <span className="text-lime-400 transition-all duration-300 group-hover:text-lime-300">
              HOTELS
            </span>
          </h2>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => handleNavClick(link.to)}
                className="relative text-sm font-bold text-gray-300 hover:text-lime-400 transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white">
                <FaUserCircle className="text-lime-400 text-2xl" />
                <div>
                  <p className="text-sm font-bold">{user.name}</p>
                  {user.role === "admin" && (
                    <p className="text-xs text-lime-400">Admin</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-gray-300 hover:text-red-400 transition-colors duration-300 px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-bold text-gray-300 hover:text-lime-400 transition-colors duration-300 px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="relative bg-lime-400 text-black text-sm font-black px-6 py-2.5 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 active:scale-95"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-lime-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-black/95 px-8 pb-6 pt-4 flex flex-col gap-4 border-t border-gray-800">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(link.to)}
              className="text-gray-300 hover:text-lime-400 font-bold text-sm uppercase tracking-wider transition-colors duration-200 text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-2">
            {user ? (
              <>
                <div className="flex-1 text-white text-sm p-2">
                  {user.name}
                  {user.role === "admin" && (
                    <span className="text-lime-400 ml-2">(Admin)</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center border border-red-700 text-red-400 text-sm font-bold py-2.5 rounded-xl hover:bg-red-700 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex-1 text-center border border-gray-700 text-white text-sm font-bold py-2.5 rounded-xl hover:border-lime-400 hover:text-lime-400 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center bg-lime-400 text-black text-sm font-black py-2.5 rounded-xl hover:bg-lime-300 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
