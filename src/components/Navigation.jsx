import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import logoLottieData from "../components/Icon/logo/logo_lottie.json"; // Move file to src and import from there

const Navigation = ({ deviceType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lottieRef = useRef();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle mouse events for Lottie animation
  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
      
      // Function to check if animation reached beginning
      const checkAnimationProgress = () => {
        if (lottieRef.current && lottieRef.current.animationItem) {
          const currentFrame = lottieRef.current.animationItem.currentFrame;
          if (currentFrame <= 1) {
            lottieRef.current.stop();
            lottieRef.current.goToAndStop(0, true);
          } else {
            requestAnimationFrame(checkAnimationProgress);
          }
        }
      };
      
      requestAnimationFrame(checkAnimationProgress);
    }
  };

  return (
    <>
      {deviceType === "desktop" ? (
        <header
          className={`bg-white fixed z-50 w-full text-black h-[62px] flex items-center`}
        >
          <nav className="w-full mx-auto py-4 px-[10px] flex justify-between items-center">
            <Link
              to="/"
              id="logoParallel"
              className="text-xl font-bold flex justify-center items-center w-[196px] cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={logoLottieData}
                loop={false}
                autoplay={false}
                style={{ 
                  width: '196px', 
                  height: 'auto',
                }}
                onComplete={() => {
                  // Optional: handle animation complete
                }}
              />
            </Link>

            <div className="space-x-5 uppercase text-[18px] font-medium">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "" : "hover:font-medium"
                }
              >
                About
              </NavLink>
              <span>I</span>
              <NavLink
                to="/works"
                className={({ isActive }) =>
                  isActive ? "" : "hover:font-medium"
                }
              >
                Works
              </NavLink>
              <span>I</span>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "" : "hover:font-medium"
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
            <nav className="w-full mx-auto py-4 px-[10px] flex justify-between items-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Lottie
                  animationData={logoLottieData}
                  loop={false}
                  autoplay={false}
                  style={{ 
                    width: '196px', 
                    height: 'auto',
                    filter: 'invert(1)'
                  }}
                />
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
          
          <div
            className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out text-black ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{ top: "64px" }}
          >
            <div className="w-full mx-auto px-[20px] pb-8 flex flex-col uppercase text-sm">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-3 border-b ${isActive ? "" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>

              <NavLink
                to="/works"
                className={({ isActive }) =>
                  `block py-3 border-b ${isActive ? "" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Works
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-3 border-b ${isActive ? "" : ""}`
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
