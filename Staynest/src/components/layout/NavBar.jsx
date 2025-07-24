import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";
import { FaHotel, FaSearch, FaUserCircle, FaTools, FaMoon, FaSun } from "react-icons/fa";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // ✅ Dark Mode State
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleAccountClick = () => {
    setShowAccount((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-white"} shadow-sm sticky-top border-bottom py-3`}>
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link
          to="/"
          className={`navbar-brand fw-bold d-flex align-items-center ${darkMode ? "text-light" : "text-primary"} fs-4 text-decoration-none`}
        >
          <FaHotel className="me-2 text-danger fs-3" />
          Staynest
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse justify-content-lg-between" id="navbarScroll">
          {/* Left Side Buttons */}
          <ul className="navbar-nav mb-2 mb-lg-0 mt-3 mt-lg-0 gap-2 w-100 justify-content-center justify-content-lg-start text-center">
            <li className="nav-item">
              <NavLink
                to="/browse-all-rooms"
                className="btn btn-outline-primary px-4 py-1 rounded-pill fw-semibold shadow-sm text-decoration-none"
              >
                <FaSearch className="me-2" />
                Browse Rooms
              </NavLink>
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className="btn btn-outline-primary px-4 py-1 rounded-pill fw-semibold shadow-sm text-decoration-none"
                >
                  <FaTools className="me-2" />
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right Side: Find Booking, Dark Mode & Account */}
          <ul className="navbar-nav d-flex align-items-center gap-3 mt-3 mt-lg-0 justify-content-center justify-content-lg-end w-100 text-center">
            <li className="nav-item">
              <NavLink
                to="/find-booking"
                className="btn btn-outline-primary px-4 py-1 rounded-pill fw-semibold shadow-sm text-decoration-none"
              >
                Find Booking
              </NavLink>
            </li>

            {/* 🌙 Dark Mode Toggle Button */}
            <li className="nav-item">
              <button
                onClick={toggleDarkMode}
                className="btn btn-outline-secondary px-3 py-1 rounded-pill fw-semibold shadow-sm"
              >
                {darkMode ? <><FaSun className="me-2" />Light</> : <><FaMoon className="me-2" />Dark</>}
              </button>
            </li>

            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="btn btn-outline-dark dropdown-toggle px-3 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2 mx-auto"
                onClick={handleAccountClick}
              >
                <FaUserCircle className="fs-5 mb-0" />
                Account
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end mt-2 shadow-sm border-0 rounded-3 overflow-hidden ${showAccount ? "show" : ""}`}
              >
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
