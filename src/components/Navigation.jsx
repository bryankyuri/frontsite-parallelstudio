import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navigation = ({ deviceType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {deviceType === "desktop" ? (
        <header className={`bg-white fixed z-50 w-full text-black h-[62px] flex items-center`}>
          <nav className="container mx-auto py-4 px-5 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              <img
                className=" invert"
                src="/logo.png"
                alt="Logo"
                width={"198px"}
                height={"auto"}
              />
            </Link>

            <div className="space-x-5 uppercase text-[18px] font-medium">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:font-medium"
                }
              >
                About
              </NavLink>
              <span>I</span>
              <NavLink
                to="/works"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:font-medium"
                }
              >
                Works
              </NavLink>
              <span>I</span>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:font-medium"
                }
              >
                Contact
              </NavLink>
            </div>
          </nav>
        </header>
      ) : (
        <>
          <header className={`bg-white fixed z-50 w-full text-black`}>
            <nav className="container mx-auto py-4 px-[10px] flex justify-between items-center">
              <Link to="/" className="text-xl font-bold">
                PARAIIIIEL STUDIO
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="p-2 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <div
                  className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${
                    mobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-black transition-all ${
                    mobileMenuOpen
                      ? "transform -rotate-45 translate-y-[-8px]"
                      : ""
                  }`}
                ></div>
              </button>
            </nav>
          </header>
          {/* Mobile menu drawer */}
          <div
            className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out text-black ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{ top: "64px" }}
          >
            <div className="container mx-auto px-[10px] pb-8 flex flex-col uppercase text-sm">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-3 border-b border-gray-100 ${
                    isActive ? "font-bold" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>

              <NavLink
                to="/works"
                className={({ isActive }) =>
                  `block py-3 border-b border-gray-100 ${
                    isActive ? "font-bold" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Works
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-3 border-b border-gray-100 ${
                    isActive ? "font-bold" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
