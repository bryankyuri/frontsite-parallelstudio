import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../components/FadeInSection";
import styles from "../styles/Works.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AppContext } from "../context/AppContext"; // Make sure this import exists

const Works = () => {
  const [activeFilters, setActiveFilters] = useState(["all project"]); // Changed to array
  const { deviceType } = useContext(AppContext);

  // Categories for filtering
  const categories = [
    "all project",
    "motion graphic",
    "color grading",
    "cgi",
    "vfx",
  ];
  const works = [
    {
      id: 1,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "vfx"],
      imageUrl: "/assets/works/work1.jpg",
    },
    {
      id: 2,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["cgi", "motion graphic", "vfx"],
      imageUrl: "/assets/works/work2.jpg",
    },
    {
      id: 3,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading"],
      imageUrl: "/assets/works/work3.jpg",
    },
    {
      id: 4,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "color grading"],
      imageUrl: "/assets/works/work4.jpg",
    },
    {
      id: 5,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["cgi", "vfx", "motion graphic"],
      imageUrl: "/assets/works/work5.jpg",
    },
    {
      id: 6,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["cgi"],
      imageUrl: "/assets/works/work6.jpg",
    },
    {
      id: 7,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic", "vfx"],
      imageUrl: "/assets/works/work7.jpg",
    },
    {
      id: 8,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "cgi", "vfx"],
      imageUrl: "/assets/works/work8.jpg",
    },
    {
      id: 9,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["motion graphic"],
      imageUrl: "/assets/works/work9.jpg",
    },
    {
      id: 10,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "motion graphic"],
      imageUrl: "/assets/works/work10.jpg",
    },
    {
      id: 11,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "cgi"],
      imageUrl: "/assets/works/work11.jpg",
    },
    {
      id: 12,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "vfx", "motion graphic", "cgi"],
      imageUrl: "/assets/works/work12.jpg",
    },
    {
      id: 13,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading"],
      imageUrl: "/assets/works/work13.jpg",
    },
    {
      id: 14,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "vfx"],
      imageUrl: "/assets/works/work14.jpg",
    },
    {
      id: 15,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      categories: ["color grading", "motion graphic", "cgi"],
      imageUrl: "/assets/works/work15.jpg",
    },
  ];
  // Handle filter toggle
  const handleFilterToggle = (category) => {
    if (category === "all project") {
      // If "all project" is clicked, clear all other filters
      setActiveFilters(["all project"]);
    } else {
      setActiveFilters((prevFilters) => {
        // Remove "all project" if it exists when selecting specific categories
        const withoutAll = prevFilters.filter(
          (filter) => filter !== "all project"
        );

        if (withoutAll.includes(category)) {
          // Remove the category if it's already selected
          const newFilters = withoutAll.filter((filter) => filter !== category);
          // If no categories left, default to "all project"
          return newFilters.length === 0 ? ["all project"] : newFilters;
        } else {
          // Add the category
          return [...withoutAll, category];
        }
      });
    }
  };

  // Filter works based on active categories
  const filteredWorks = works.filter((work) => {
    if (activeFilters.includes("all project")) {
      return true;
    }
    // Check if work has any of the selected categories
    return work.categories.some((category) =>
      activeFilters.some(
        (filter) => filter.toLowerCase() === category.toLowerCase()
      )
    );
  });

  return (
    <div className={styles.works}>
      <div className="w-full mx-auto px-[10px] py-16">
        <FadeInSection>
          <h1 className="lg:text-[40px] text-[36px] text-black font-bold lg:mb-[80px] text-center">
            WORKS
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="flex justify-center lg:mb-[151px] my-[117px] space-x-4">
            {deviceType === "desktop" ? (
              <>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      activeFilters.includes(category)
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                    }`}
                    onClick={() => handleFilterToggle(category)}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </>
            ) : (
              <div className="w-full">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  className="categories-swiper"
                >
                  {categories.map((category, index) => (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <button
                        className={`px-4 py-2 rounded whitespace-nowrap transition-all duration-200 ${
                          activeFilters.includes(category)
                            ? "bg-black text-white"
                            : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                        }`}
                        onClick={() => handleFilterToggle(category)}
                      >
                        {category.toUpperCase()}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Show active filters count (optional) */}
        {/* {!activeFilters.includes("all project") && (
          <div className="text-center mb-4 text-sm text-gray-600">
            Showing {filteredWorks.length} works with {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} selected
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[10px] gap-y-5">
          <AnimatePresence mode="wait">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Link to={`/works/${work.id}`} className="workItem">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <FadeInSection delay={0.3}>
          <div className="w-full mb-[155px]">
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
    </div>
  );
};

export default Works;
