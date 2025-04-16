import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../api/index";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.scss";
import { IconTriangle } from "../components/Icon/IconTriangle";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FadeInSection } from "../components/FadeInSection";

const Home = () => {
  const { vh, deviceType } = useContext(AppContext);
  // Default to null so no accordion is open by default
  const [activeProject, setActiveProject] = useState(null);
  // Track which project image to display (default to first)
  const [activeImage, setActiveImage] = useState(0);

  // State to track scroll percentage
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const projects = [
    {
      id: 1,
      image: "/assets/works/work1.jpg", // Replace with your image path
      title: "PILLOW WALK",
      client: "ALDO",
      categories: ["COLOR GRADING", "REMOTE GRADING", "COMPUTER GRAPHIC"],
    },
    {
      id: 2,
      image: "/assets/works/work2.jpg",
      title: "TOKOPEDIA",
      client: "RAMADAN 2024",
      categories: ["MOTION GRAPHIC", "COMPUTER GRAPHIC"],
    },
    {
      id: 3,
      image: "/assets/works/work3.jpg",
      title: "TRUST IN GOLD",
      client: "UBS GOLD",
      categories: ["DRY HIRE", "REMOTE GRADING", "COMPUTER GRAPHIC"],
    },
    {
      id: 4,
      image: "/assets/works/work4.jpg",
      title: "SPEAK TO ME",
      client: "SOCIOLLA",
      categories: ["MOTION GRAPHIC", "COMPUTER GRAPHIC", "REMOTE GRADING"],
    },
  ];

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

  // Function to change displayed image
  const changeImage = (index) => {
    setActiveImage(index);
  };

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
  const words = aboutText.split(" ").filter(word => word.trim() !== "");

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-wording");
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Adjust trigger point to be earlier in the viewport
        const triggerPoint = windowHeight * 0.8;
        
        let percentage = 0;
        
        if (elementTop <= triggerPoint) {
          // Calculate percentage based on how far element has entered viewport
          percentage = (triggerPoint - elementTop) / (triggerPoint + elementHeight);
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

  return (
    <div className={styles.home}>
      <div className="w-full mx-auto px-0">
        <div id="banner" className="relative h-[calc(100vh-62px)] ">
          <div className="sticky top-0 left-0 w-full h-[calc(100vh-62px)] overflow-hidden z-[1]">
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-62px)]">
              <video
                src="https://cdn.jasonbradley.co/pic/ff41675d.mp4"
                loop="loop"
                muted="muted"
                playsInline=""
                nocontrols=""
                className="absolute w-full h-full top-0 left-0"
                data-critical=""
                style={{ objectFit: "cover" }}
                autoPlay="autoPlay"
              ></video>
            </div>
          </div>
          <div
            id="projectContainer"
            className="absolute top-0 left-0 w-full h-[calc(100vh-62px)] z-[1] flex flex-col justify-end"
          >
            {projects.map((project, index) => (
              <div
                id={`projectWrapper${index}`}
                key={`project${index}`}
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
                className="relative flex flex-col will-change-transform z-[1]"
              >
                <button
                  className="relative px-5 py-2 text-[12px] text- text-black font-semibold overflow-hidden text-left z-[3] flex items-center justify-between border-b"
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    background: "white",
                  }}
                >
                  <div className="lg:w-[40%] w-full">{project.title}</div>
                  {deviceType === "desktop" && (
                    <>
                      <div className="lg:w-[40%] w-full">{project.client}</div>
                      <div className="lg:w-full w-[80%]">
                        {project.categories}
                      </div>
                    </>
                  )}
                  <div className="w-[17px] rotate-180">
                    <IconTriangle />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div
          id="about-wording"
          className="px-5 pt-8 uppercase font-extrabold text-black text-[24px] leading-[30px] lg:text-[44px] lg:leading-[54px] lg:pb-[185px] pb-[140px]"
        >
          {words.map((word, index) => {
            const delayFactor = deviceType  === "desktop" ? index / words.length * 0.5 : index / words.length * 0.8; // Adjusted delay factor
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
            <h2 className="font-bold text-left mb-10 text-black">
              LATEST PROJECT
            </h2>

            {/* First Row (2 Columns) */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
              {dataWorks.slice(0, 2).map((work) => (
                <Link to={`/works/${work.id}`} className={styles.workItem}>
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
                <Link to={`/works/${work.id}`} className={styles.workItem}>
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
                paddingBottom: deviceType === "desktop" ? "calc(56.25% - 62px)" : "calc(177.78% - 66px)" // 16:9 for desktop, 9:16 for mobile
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={deviceType === "desktop" 
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
    </div>
  );
};

export default Home;
