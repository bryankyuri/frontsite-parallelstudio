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

const Home = () => {
  const { vh, deviceType } = useContext(AppContext);
  // Default to null so no accordion is open by default
  const [activeProject, setActiveProject] = useState(-1);
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
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work1.jpg",
    },
    {
      id: 2,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "CGI",
      imageUrl: "/assets/works/work2.jpg",
    },
    {
      id: 3,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work3.jpg",
    },
    {
      id: 4,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "MOTION GRAPHIC",
      imageUrl: "/assets/works/work4.jpg",
    },
    {
      id: 5,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "CGI",
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
  const handleWheel = useCallback(
    debounce((event) => {
      const windowScroll = window.scrollY;
      const direction = event.deltaY > 0 ? "down" : "up";
      if (direction === "down") {
        if (activeProject === projects.length - 1) {
          setIsWindowLocked(false);
        } else {
          handleAccrodionClick(activeProject + 1);
        }
      } else {
        console.log("activeProject", activeProject, isWindowLocked);
        if (activeProject === projects.length - 1) {
          if (windowScroll === 0) {
            console.log("test0");
            if (isWindowLocked) {
              handleAccrodionClick(activeProject - 1);
            } else {
              console.log("test1");
              setIsWindowLocked(true);
            }
          }
        } else {
          console.log("test");
          if (activeProject === 0) {
            handleAccrodionClick(activeProject);
          } else {
            handleAccrodionClick(activeProject - 1);
          }
        }
      }
    }, 300), // 50ms debounce time
    [activeProject, isWindowLocked]
  );

  const handleKeyDown = useCallback(
    debounce((event) => {
      const windowScroll = window.scrollY;
      if (event.key === "ArrowUp") {
        if (activeProject === projects.length - 1) {
          if (windowScroll === 0) {
            console.log("test0");
            if (isWindowLocked) {
              handleAccrodionClick(activeProject - 1);
            } else {
              console.log("test1");
              setIsWindowLocked(true);
            }
          }
        } else {
          console.log("test");
          if (activeProject === 0) {
            handleAccrodionClick(activeProject);
          } else {
            handleAccrodionClick(activeProject - 1);
          }
        }
      } else if (event.key === "ArrowDown") {
        if (activeProject === projects.length - 1) {
          setIsWindowLocked(false);
        } else {
          handleAccrodionClick(activeProject + 1);
        }
      }
    }, 300), // 50ms debounce time
    [activeProject, isWindowLocked]
  );

  // Add this state to track touch positions
  const [touchStartY, setTouchStartY] = useState(0);

  // Create touch handlers using useRef for stable references
  const handleTouchStart = useCallback((event) => {
    // Store the initial touch Y position
    setTouchStartY(event.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    debounce((event) => {
      // If no starting position recorded, exit
      if (touchStartY === 0) return;

      // Calculate direction based on touch delta
      const touchEndY = event.touches[0].clientY;
      const touchDelta = touchStartY - touchEndY;
      const direction = touchDelta > 0 ? "down" : "up";
      const windowScroll = window.scrollY;

      // Use the same logic as handleWheel
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
        } else {
          if (activeProject === 0) {
            handleAccrodionClick(activeProject);
          } else {
            handleAccrodionClick(activeProject - 1);
          }
        }
      }

      // Reset the touch start position
      setTouchStartY(0);
    }, 300),
    [activeProject, isWindowLocked, touchStartY, projects.length]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove]);

  useEffect(() => {
    if (isWindowLocked) {
      document.body.style.overflow = "hidden"; // Lock scrollbar
    } else {
      document.body.style.overflow = ""; // Unlock scrollbar
    }

    // Cleanup function - runs when component unmounts or before effect reruns
    return () => {
      document.body.style.overflow = ""; // Reset scrollbar on unmount
    };
  }, [isWindowLocked]);

  const handleAccrodionClick = (index) => {
    const tempDataProjects = [...projects];
    let newDataProject = [];

    const isPositionOpen = tempDataProjects[index].position < 0;
    if (isPositionOpen) {
      tempDataProjects.map((project, i) => {
        if (index === tempDataProjects.length - 1) {
          if (i === index) {
            project.position = 0;
            newDataProject.push(project);
          } else {
            newDataProject.push(project);
          }
        } else {
          if (tempDataProjects[index + 1].position === 0) {
            if (i >= index) {
              project.position = 0;
              newDataProject.push(project);
            } else {
              newDataProject.push(project);
            }
          } else {
            if (i > index) {
              project.position = 0;
              newDataProject.push(project);
            } else {
              newDataProject.push(project);
            }
          }
        }
      });
      if (index === tempDataProjects.length - 1) {
        setActiveProject(activeProject - 1);
      } else {
        if (tempDataProjects[index + 1].position === 0) {
          setActiveProject(activeProject - 1);
        } else {
          setActiveProject(activeProject + 1);
        }
      }
    } else {
      tempDataProjects.map((project, i) => {
        if (i <= index) {
          project.position = (vh - 202) * -1;
          newDataProject.push(project);
        } else {
          newDataProject.push(project);
        }
      });
      setActiveProject(activeProject + 1);
      if (activeProject + 1 === projects.length - 1) {
        setIsWindowLocked(false);
      }
    }

    if (!isWindowLocked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsWindowLocked(true);
    }
    setProjects(newDataProject);
  };

  console.log(scrollDirection, isWindowLocked, activeProject);
  return (
    <div className={styles.home}>
      <div className="w-full mx-auto px-0">
        <div
          id="banner"
          className="relative h-[calc(100vh-62px)] overflow-hidden"
        >
          <div className="sticky top-0 left-0 w-full h-[calc(100vh-62px)] overflow-hidden z-[1]">
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-62px)]">
              <video
                src="https://cdn.jasonbradley.co/pic/ff41675d.mp4"
                loop
                muted
                playsInline
                autoPlay
                className="absolute w-full h-full top-0 left-0"
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
          </div>
          <div
            id="projectContainer"
            className="absolute top-0 left-0 w-full h-[calc(100vh-62px)] z-[1] flex flex-col justify-end transition-all duration-700"
          >
            {projects?.length > 0 && (
              <>
                {projects.map((project, index) => (
                  <div
                    id={`projectWrapper${index}`}
                    key={`project${index}`}
                    className="relative flex flex-col will-change-transform z-[1]"
                    style={{
                      transform: `translate3d(0px, ${project.position}px, 0px)`,
                      transition: "transform 0.7s ease-in-out",
                      cursor: "none", // Hide default cursor
                    }}
                  >
                    <button
                      onClick={() => {
                        handleAccrodionClick(index);
                      }}
                      className={`outline-none relative px-5 py-2 text-[12px] ${
                        activeProject === index ? "text-white" : "text-black"
                      } font-semibold overflow-hidden text-left z-[3] flex items-center justify-between border-b transition-all duration-[0.6s]`}
                      style={{
                        transform: `translate3d(0px, 0px, 0px)`,
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
                      className="top-[35px] absolute z-0 w-full"
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
                          className="absolute w-full h-full top-0 left-0"
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
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div
          id="about-wording"
          className="px-5 pt-8 uppercase font-extrabold text-black text-[24px] leading-[30px] lg:text-[44px] lg:leading-[54px] lg:pb-[185px] pb-[140px]"
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
          <div id="latest-projects" className="px-5">
            {/* Header */}
            <h2 className="lg:text-[24px] text-[16px] font-bold text-left mb-10 text-black">
              LATEST PROJECT
            </h2>

            {/* First Row (2 Columns) */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
              {dataWorks.slice(0, 2).map((work) => (
                <Link to={`/works/${work.id}`} className={stylesWork.workItem}>
                  <div className="overflow-hidden">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full object-cover transition-transform duration-700 hover:scale-[105%]"
                    />
                    <div className="mt-[20px] flex justify-between">
                      <div className="text-black">
                        <span>{work.title}</span>
                        <span> | {work.client}</span>
                      </div>
                      <div className="text-[#B4B4B4]">{work.category}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Second Row (3 Columns) */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {dataWorks.slice(2, 5).map((work) => (
                <Link to={`/works/${work.id}`} className={stylesWork.workItem}>
                  <div className="overflow-hidden">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                    />
                    <div className="mt-[20px] flex justify-between">
                      <div className="text-black">
                        <span>{work.title}</span>
                        <span> | {work.client}</span>
                      </div>
                      <div className="text-[#B4B4B4]">{work.category}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="my-20 text-center">
              <Link
                to="/works"
                className="bg-black text-white p-4 font-semibold rounded hover:bg-gray-800 transition duration-300"
              >
                VIIIIIEW ALL PROJECT
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
                    : "calc(177.78% - 66px)", // 16:9 for desktop, 9:16 for mobile
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={
                  deviceType === "desktop"
                    ? "https://www.youtube.com/embed/dQw4w9WgXcQ" // Regular YouTube video
                    : "https://www.youtube.com/embed/K3GS-KFp5Yc" // YouTube Shorts video
                }
                title="Showreel Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <div className="px-5 w-full mb-[155px]">
            <div className="mt-[122px] text-left max-w-[574px] lg:text-[24px] text-[20px] lg:leading-[110%] leading-[100%] font-medium text-black">
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
      {hoveredProject !== null && deviceType === "desktop" (
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
            fontWeight: "bold",
            color: "white",
            overflow: "hidden",
          }}
        >
          <div className="marquee-container overflow-hidden w-[80%]">
            <div className="marquee-text whitespace-nowrap animate-marquee">
              {projects[hoveredProject]?.title} •{" "}
              {projects[hoveredProject]?.client} •{" "}
              {projects[hoveredProject]?.title} •{" "}
              {projects[hoveredProject]?.client} •{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
