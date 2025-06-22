import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import { fetchData } from "../api/index";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.scss";
import stylesWork from "../styles/Works.module.scss";
import { IconTriangle } from "../components/Icon/IconTriangle";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FadeInSection } from "../components/FadeInSection";
import { video } from "framer-motion/client";
import { debounce } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Home = () => {
  const { vh, deviceType } = useContext(AppContext);
  // Default to null so no accordion is open by default
  const [activeProject, setActiveProject] = useState(0);
  // Track which project image to display (default to first)
  const [activeImage, setActiveImage] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isWindowLocked, setIsWindowLocked] = useState(true);
  const [projects, setProjects] = useState([
    {
      id: 1,
      image: "/assets/works/work1.jpg", // Replace with your image path
      title: "PILLOW WALK",
      client: "ALDO",
      categories: ["COLOR GRADING", "REMOTE GRADING", "COMPUTER GRAPHIC"],
      videoUrl: "https://cdn.jasonbradley.co/pic/6e1d7d78%20(1).mp4",
      position: 0,
    },
    {
      id: 2,
      image: "/assets/works/work2.jpg",
      title: "TOKOPEDIA",
      client: "RAMADAN 2024",
      categories: ["MOTION GRAPHIC", "COMPUTER GRAPHIC"],
      videoUrl: "https://cdn.jasonbradley.co/pic/cafd3e4d.mp4",
      position: 0,
    },
    {
      id: 3,
      image: "/assets/works/work3.jpg",
      title: "TRUST IN GOLD",
      client: "UBS GOLD",
      categories: ["DRY HIRE", "REMOTE GRADING", "COMPUTER GRAPHIC"],
      videoUrl: "https://cdn.jasonbradley.co/pic/1e50e423-e10aee53.mp4",
      position: 0,
    },
    {
      id: 4,
      image: "/assets/works/work4.jpg",
      title: "SPEAK TO ME",
      client: "SOCIOLLA",
      categories: ["MOTION GRAPHIC", "COMPUTER GRAPHIC", "REMOTE GRADING"],
      videoUrl: "https://cdn.jasonbradley.co/pic/3253312293.mp4",
      position: 0,
    },
  ]);

  // State to track scroll percentage
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const dataWorks = [
    {
      id: 1,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx", "color grading", "cgi"],
      imageUrl: "/assets/works/work1.jpg",
    },
    {
      id: 2,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx", "color grading", "cgi"],
      imageUrl: "/assets/works/work2.jpg",
    },
    {
      id: 3,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx", "color grading", "cgi"],
      imageUrl: "/assets/works/work3.jpg",
    },
    {
      id: 4,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx", "color grading", "cgi"],
      imageUrl: "/assets/works/work4.jpg",
    },
    {
      id: 5,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx", "Color grading", "cgi"],
      imageUrl: "/assets/works/work5.jpg",
    },
  ];

  // Process text to wrap each word in a span with animation styles
  const aboutText = `We are an independent post-production house trusted by our
            collaborator to help tell incredible stories. Specializing in color
            grading and VFX, we work across TV commercials, music videos,
            episodic content, short films, and feature films. Our talented artists focus on the details that bring each project to
            life, working closely with clients to enhance their vision. With a
            commitment to visual storytelling, we craft work that feels
            authentic and compelling, ensuring every story is told in the most
            impactful way.                                `;

  // Combine and split the text into words
  const words = aboutText.split(" ").filter((word) => word.trim() !== "");

  // Add these state variables
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchThreshold, setTouchThreshold] = useState(50); // Sensitivity threshold

  // Add custom cursor styles
  const customCursorStyles = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .animate-marquee {
      display: inline-block;
      animation: marquee 5s linear infinite;
    }
  `;

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customCursorStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-wording");
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Adjust trigger point to be earlier in the viewport
        const triggerPoint = windowHeight * 0.8; // 80% of viewport height

        let percentage = 0;

        if (elementTop <= triggerPoint) {
          // Calculate percentage based on how far element has entered viewport
          percentage =
            (triggerPoint - elementTop) / (triggerPoint + elementHeight);
          // Clamp value between 0 and 1
          percentage = Math.max(0, Math.min(1, percentage));
        }

        setScrollPercentage(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Create debounced handlers using useRef for stable references
  const handleKeyDown = useCallback(
    debounce((event) => {
      const windowScroll = window.scrollY;
      if (event.key === "ArrowUp") {
        if (activeProject === projects.length - 1) {
          if (windowScroll === 0) {
            if (isWindowLocked) {
              handleAccrodionClick(activeProject - 1);
            } else {
              setIsWindowLocked(true);
            }
          }
        } else if (activeProject > 0) {
          // Only allow slide up if activeProject > 0
          handleAccrodionClick(activeProject - 1);
        }
        // Do nothing when activeProject is 0 and trying to slide up
      } else if (event.key === "ArrowDown") {
        if (activeProject === projects.length - 1) {
          setIsWindowLocked(false);
        } else {
          handleAccrodionClick(activeProject + 1);
        }
      }
    }, 150),
    [activeProject, isWindowLocked]
  );

  // Improved touch handlers
  const handleTouchStart = useCallback((event) => {
    setTouchStartY(event.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    debounce((event) => {
      // If no starting position recorded, exit
      if (touchStartY === 0) return;

      // Calculate direction based on touch delta
      const touchEndY = event.touches[0].clientY;
      const touchDelta = touchStartY - touchEndY;

      // Exit if movement is too small (improves trackpad experience)
      if (Math.abs(touchDelta) < touchThreshold) {
        return;
      }

      const direction = touchDelta > 0 ? "down" : "up";
      const windowScroll = window.scrollY;

      // Use the same logic as handleWheel with added sensitivity control
      if (direction === "down") {
        if (activeProject === projects.length - 1) {
          setIsWindowLocked(false);
        } else {
          handleAccrodionClick(activeProject + 1);
        }
      } else {
        if (activeProject === projects.length - 1) {
          if (windowScroll === 0) {
            if (isWindowLocked) {
              handleAccrodionClick(activeProject - 1);
            } else {
              setIsWindowLocked(true);
            }
          }
        } else if (activeProject > 0) {
          handleAccrodionClick(activeProject - 1);
        }
      }

      // Reset the touch start position
      setTouchStartY(0);
    }, 100), // Reduced debounce time for more responsiveness
    [
      activeProject,
      isWindowLocked,
      touchStartY,
      projects.length,
      touchThreshold,
    ]
  );

  // Add this near your other state variables
  const projectVariants = {
    open: (i) => ({
      y: (vh - 202) * -1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 42,
        // delay: i * 0.05, // Slight stagger effect
      },
    }),
    closed: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 44,
      },
    },
  };

  // Add these near your other state variables
  const [showSpans, setShowSpans] = useState([false, false, false, false]);

  // Add this function to handle the sequence animation
  const handleProjectLinkHover = (isHovering) => {
    if (isHovering) {
      // Show spans sequentially when hovering
      setShowSpans([true, false, false, false]);
      setTimeout(() => setShowSpans([true, true, false, false]), 100);
      setTimeout(() => setShowSpans([true, true, true, false]), 200);
      setTimeout(() => setShowSpans([true, true, true, true]), 300);
    } else {
      // Hide spans sequentially when not hovering
      setShowSpans([true, true, true, false]);
      setTimeout(() => setShowSpans([true, true, false, false]), 100);
      setTimeout(() => setShowSpans([true, false, false, false]), 200);
      setTimeout(() => setShowSpans([false, false, false, false]), 300);
    }
  };

  // Add these state variables at the top with your other state
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastEventTime, setLastEventTime] = useState(0);
  const ANIMATION_DURATION = 700; // Match your animation duration (ms)
  const EVENT_THRESHOLD = 50; // Minimum ms between distinct gestures

  // Add these state variables
  const deltaAccumulator = useRef(0);
  const lastWheelDirection = useRef(null);
  const wheelTimeout = useRef(null);

  // Modified handleWheel function that preserves all your existing functionality
  const handleWheel = useCallback(
    (event) => {
      const now = Date.now();
      const windowScroll = window.scrollY;
      const direction = event.deltaY > 0 ? "down" : "up";

      // Always prevent default when window is locked
      if (isWindowLocked) {
        event.preventDefault();
      }

      // Clear any pending timeout
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }

      // If already animating, ignore events completely
      if (isAnimating) {
        event.preventDefault();
        return;
      }

      // If direction changed, reset accumulator
      if (lastWheelDirection.current !== direction) {
        deltaAccumulator.current = 0;
        lastWheelDirection.current = direction;
      }

      // Accumulate delta (works for both mouse wheel and trackpad)
      deltaAccumulator.current += Math.abs(event.deltaY);

      // Different thresholds based on device detection
      const thresholdForScroll = /Mac|MacIntel/.test(navigator.platform)
        ? 50 // Lower threshold for Mac trackpads
        : 100;

      // Only trigger navigation when accumulated delta is large enough
      if (deltaAccumulator.current >= thresholdForScroll) {
        // Reset accumulator
        deltaAccumulator.current = 0;

        // Set animation flag to prevent further events
        setIsAnimating(true);

        // Rest of your existing logic unchanged
        if (direction === "down") {
          if (activeProject === projects.length - 1) {
            setIsWindowLocked(false);
            setIsAnimating(false);
          } else {
            handleAccrodionClick(activeProject + 1);
            setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
          }
        } else {
          if (activeProject === projects.length - 1) {
            if (windowScroll === 0) {
              if (isWindowLocked) {
                handleAccrodionClick(activeProject - 1);
                setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
              } else {
                setIsWindowLocked(true);
                setIsAnimating(false);
              }
            } else {
              setIsAnimating(false);
            }
          } else if (activeProject > 0) {
            handleAccrodionClick(activeProject - 1);
            setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
          } else {
            setIsAnimating(false);
          }
        }
      }

      // Set timeout to reset accumulator after a short period of inactivity
      wheelTimeout.current = setTimeout(() => {
        deltaAccumulator.current = 0;
        lastWheelDirection.current = null;
      }, 300);
    },
    [activeProject, isWindowLocked, isAnimating, projects.length]
  );

  // Add event listeners
  useEffect(() => {
    // The passive: false option is crucial for preventDefault() to work
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove]);

  // Add this useEffect to control body scroll behavior
  useEffect(() => {
    if (isWindowLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup
    };
  }, [isWindowLocked]);

  const handleAccrodionClick = (index) => {
    // Clone the projects array to avoid direct state mutation
    const tempDataProjects = [...projects];
    let newDataProject = [];

    // Check if the clicked project is already open (position is negative)
    const isPositionOpen = tempDataProjects[index].position < 0;

    if (isPositionOpen) {
      // If project is already open, clicking closes it
      tempDataProjects.forEach((project, i) => {
        // Last project handling
        if (index === tempDataProjects.length - 1) {
          if (i === index) {
            project.position = 0;
          }
          newDataProject.push(project);
        } else {
          // For projects other than last
          if (tempDataProjects[index + 1].position === 0) {
            if (i >= index) {
              project.position = 0;
            }
            newDataProject.push(project);
          } else {
            if (i > index) {
              project.position = 0;
            }
            newDataProject.push(project);
          }
        }
      });

      // Update active project based on position
      if (index === tempDataProjects.length - 1) {
        // Safety check to prevent activeProject going below 0
        const newActiveProject = Math.max(0, activeProject - 1);
        setActiveProject(newActiveProject);
        setHoveredProject(newActiveProject);
      } else {
        if (tempDataProjects[index + 1].position === 0) {
          // Safety check to prevent activeProject going below 0
          const newActiveProject = Math.max(0, activeProject - 1);
          setActiveProject(newActiveProject);
          setHoveredProject(newActiveProject);
        } else {
          setActiveProject(index + 1);
          setHoveredProject(index + 1);
        }
      }
    } else {
      // If project is closed, clicking opens it
      tempDataProjects.forEach((project, i) => {
        if (i <= index) {
          // Move all projects up to and including clicked one off screen
          project.position = (vh - 202) * -1;
        }
        newDataProject.push(project);
      });

      // Set clicked project as active
      setActiveProject(index);

      // If last project is activated, unlock the window for scrolling
      if (index === projects.length - 1) {
        setIsWindowLocked(false);
      }
    }

    // If window was unlocked, lock it and scroll to top
    if (!isWindowLocked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsWindowLocked(true);
    }

    // Update projects state with new positions
    setProjects(newDataProject);
  };

  console.log(scrollDirection, isWindowLocked, activeProject);
  return (
    <div className={styles.home}>
      <div className="w-full mx-auto px-0">
        <div
          id="banner"
          className="relative h-[calc(100vh-62px)] overflow-hidden overscroll-y-none"
        >
          {/* <div className="sticky top-0 left-0 w-full h-[calc(100vh-62px)] overflow-hidden z-[1] overscroll-y-none">
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-62px)]">
              <video
                src="https://cdn.jasonbradley.co/pic/ff41675d.mp4"
                loop
                muted
                playsInline
                autoPlay
                className={`absolute w-full h-full top-0 left-0 ${
                  activeProject <= 0 ? "" : "hidden"
                }`}
                data-critical=""
                style={{ objectFit: "cover" }}
                ref={(el) => {
                  if (el) {
                    el.play().catch((error) => {
                      console.log("Autoplay prevented:", error);
                      // Attempt to play again on first user interaction
                      document.body.addEventListener(
                        "touchstart",
                        () => {
                          el.play().catch((e) =>
                            console.log("Still can't play:", e)
                          );
                        },
                        { once: true }
                      );
                    });
                  }
                }}
              ></video>
            </div>
          </div> */}
          <div
            id="projectContainer"
            className="absolute top-0 left-0 w-full h-[calc(100vh-62px)] z-[1] flex flex-col justify-end transition-all duration-700"
          >
            {projects?.length > 0 && (
              <>
                {projects.map((project, index) => (
                  <motion.div
                    id={`projectWrapper${index}`}
                    key={`project${index}`}
                    className="relative flex flex-col will-change-transform z-[1] outline-none"
                    custom={index} // Pass index for staggered animations
                    variants={projectVariants}
                    animate={index <= activeProject ? "open" : "closed"}
                    style={{ cursor: "none" }}
                  >
                    <button
                      onClick={() => {
                        handleAccrodionClick(index);
                      }}
                      id={`accordionTrigger${index}`}
                      className={`outline-none relative px-5 py-2 text-[12px] ${
                        activeProject === index
                          ? "text-white border-transparent"
                          : "text-black border-[#D2D2D2]"
                      } font-semibold overflow-hidden text-left z-[3] flex items-center justify-between border-b  transition-all duration-[0.6s]`}
                      style={{
                        background: activeProject === index ? "black" : "white",
                      }}
                    >
                      <div className="lg:w-[40%] w-full">{project.title}</div>
                      {deviceType === "desktop" && (
                        <>
                          <div className="lg:w-[40%] w-full">
                            {project.client}
                          </div>
                          <div className="lg:w-full w-[80%]">
                            {project.categories}
                          </div>
                        </>
                      )}
                      <div
                        className={`w-[17px] flex justify-center items-center transition-all duration-[0.3s] ${
                          activeProject === index ? "invert" : "rotate-180"
                        }`}
                      >
                        <IconTriangle />
                      </div>
                    </button>
                    <Link
                      to={`/works/${project.id}`}
                      className="top-[35px] absolute z-0 w-full outline-none"
                      style={{ height: "calc(100vh - 202px)" }}
                    >
                      <div
                        className="w-full h-full relative overflow-hidden"
                        id={`projectVideo${index}`}
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        <video
                          src={project.videoUrl}
                          loop
                          muted
                          playsInline
                          autoPlay
                          className="absolute w-full h-full top-0 left-0 outline-none"
                          data-critical=""
                          style={{ objectFit: "cover" }}
                          allowFullScreen="false"
                          ref={(el) => {
                            if (el) {
                              el.play().catch((error) => {
                                console.log("Autoplay prevented:", error);
                                // Attempt to play again on first user interaction
                                document.body.addEventListener(
                                  "touchstart",
                                  () => {
                                    el.play().catch((e) =>
                                      console.log("Still can't play:", e)
                                    );
                                  },
                                  { once: true }
                                );
                              });
                            }
                          }}
                        ></video>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
        <div
          id="about-wording"
          className="px-[10px] lg:pt-[65px] pt:[40px] uppercase font-extrabold text-black text-[24px] leading-[30px] lg:text-[44px] lg:leading-[54px] lg:pb-[65px] pb-[40px] lg:text-justify"
        >
          {words.map((word, index) => {
            const delayFactor =
              deviceType === "desktop"
                ? (index / words.length) * 0.5
                : (index / words.length) * 0.8; // Adjusted delay factor
            const shouldBeColored = scrollPercentage >= delayFactor;

            return (
              <React.Fragment key={`word-${index}`}>
                <span
                  style={{
                    color: shouldBeColored ? "black" : "#B4B4B4",
                    transition: "color 0.3s ease", // Slightly longer transition
                  }}
                >
                  {word}
                </span>
                {word === "films." && (
                  <div>
                    <br />
                  </div>
                )}{" "}
              </React.Fragment>
            );
          })}
        </div>
        <FadeInSection delay={0.3}>
          <div id="latest-projects">
            {/* Header */}
            <h2 className="lg:text-[20px] text-[16px] font-bold text-left mb-10 text-black px-[10px]">
              LATEST PROJECT
            </h2>

            <div className="mb-6">
              <Swiper
                slidesPerView={2.2}
                spaceBetween={10}
                className="w-full px-[10px]"
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                  },
                }}
              >
                {dataWorks.map((work, index) => (
                  <SwiperSlide key={`second-row-${index}`}>
                    <Link to={`/works/${work.id}`} className="workItem block">
                      <div className="overflow-hidden">
                        <div className="overflow-hidden relative">
                          <img
                            src={work.imageUrl}
                            alt={work.title}
                            className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                          />
                          <div
                            className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end uppercase px-[15px] py-5"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)",
                            }}
                          >
                            {work.categories
                              .slice() // Create a copy to avoid mutating the original array
                              .sort((a, b) => b.length - a.length) // Sort by length descending (longest first)
                              .map((category, catIndex) => {
                                return (
                                  <div
                                    key={`category-${catIndex}`}
                                    className={`text-white leading-none`}
                                  >
                                    {category}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <div className="mt-[10px] flex justify-between workInfo">
                          <div className="text-black">
                            <span className="pre">I</span>
                            <span className="workTitle">{work.title}</span>
                            <span className="divider">&nbsp;I&nbsp;</span>
                            <span>{work.client}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* View All Projects Button */}
            <div className="my-20 text-center w-full">
              <Link
                to="/works"
                className="mx-auto hover:bg-black hover:text-white py-4 font-semibold rounded bg-[#F0F0F0] text-[#787878] transition duration-300 relative flex items-center justify-center w-[228px]"
                onMouseEnter={() => handleProjectLinkHover(true)}
                onMouseLeave={() => handleProjectLinkHover(false)}
              >
                VI
                <span
                  className={`project-link-span ${
                    showSpans[0] ? "w-[4.38px] " : "w-0 "
                  }`}
                >
                  I
                </span>
                <span
                  className={`project-link-span ${
                    showSpans[1] ? "w-[4.38px] " : "w-0 "
                  }`}
                >
                  I
                </span>
                <span
                  className={`project-link-span ${
                    showSpans[2] ? "w-[4.38px] " : "w-0 "
                  }`}
                >
                  I
                </span>
                <span
                  className={`project-link-span ${
                    showSpans[3] ? "w-[4.38px] " : "w-0 "
                  }`}
                >
                  I
                </span>
                EW ALL PROJECT
              </Link>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <div id="ShowReel" className="lg:mb-[160px] mb-20">
            <div
              className="relative w-full"
              style={{
                paddingBottom:
                  deviceType === "desktop"
                    ? "calc(56.25% - 62px)"
                    : // : "calc(177.78% - 66px)", // 16:9 for desktop, 9:16 for mobile
                      "calc(86.25% - 62px)",
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={
                  deviceType === "desktop"
                    ? "https://www.youtube.com/embed/dQw4w9WgXcQ" // Regular YouTube video
                    : // : "https://www.youtube.com/embed/K3GS-KFp5Yc" // YouTube Shorts video
                      "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
                title="Showreel Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <div className="px-[10px] w-full mb-[155px]">
            <div className="mt-[122px] text-left max-w-[574px] lg:text-[20px] text-[20px] lg:leading-[110%] leading-[100%] font-medium text-black">
              HAVE A PROJECT IN MIND? LET'S GET TO WORK.
              <br />
              WE'RE ALWAYS OPEN FOR A CHAT,
              <br />
              SO GET IN TOUCH TO FIND OUT
              <br />
              HOW WE CAN HELP.
            </div>
            <Link
              to="/contact"
              className="inline-block border rounded bg-[#F0F0F0] text-[#787878] mt-[20px] px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors font-semibold"
            >
              GET IN TOUCH
            </Link>
          </div>
        </FadeInSection>
      </div>
      {activeProject > -1 &&
        hoveredProject !== null &&
        deviceType === "desktop" && (
          <div
            className="fixed pointer-events-none z-[15] flex items-center justify-center"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
              width: "200px",
              height: "120px",
              borderRadius: "50%",
              mixBlendMode: "difference",
              fontWeight: "semibold",
              color: "white",
              overflow: "hidden",
            }}
          >
            <div className="marquee-container overflow-hidden w-[80%]">
              <div className="marquee-text whitespace-nowrap animate-marquee text-[13px]">
                I&nbsp;&nbsp;&nbsp;
                {projects[activeProject]
                  ? projects[activeProject].title
                  : projects[hoveredProject]?.title}
                &nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;
                {projects[activeProject]
                  ? projects[activeProject].client
                  : projects[hoveredProject]?.client}
                &nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;
                {projects[activeProject]
                  ? projects[activeProject].title
                  : projects[hoveredProject]?.title}
                &nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;
                {projects[activeProject]
                  ? projects[activeProject].client
                  : projects[hoveredProject]?.client}
                &nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;
