import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../components/FadeInSection";
import styles from "../styles/Works.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AppContext } from "../context/AppContext"; // Make sure this import exists

const Works = () => {
  const [activeFilter, setActiveFilter] = useState("ALL PROJECT");
  const { deviceType } = useContext(AppContext);
  // Categories for filtering
  const categories = ["ALL PROJECT", "COLOR GRADING", "MOTION GRAPHIC", "CGI"];

  // Mock data for works
  const works = [
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
    {
      id: 6,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "CGI",
      imageUrl: "/assets/works/work6.jpg",
    },
    {
      id: 7,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "MOTION GRAPHIC",
      imageUrl: "/assets/works/work7.jpg",
    },
    {
      id: 8,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work8.jpg",
    },
    {
      id: 9,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "MOTION GRAPHIC",
      imageUrl: "/assets/works/work9.jpg",
    },
    {
      id: 10,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work10.jpg",
    },
    {
      id: 11,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work11.jpg",
    },
    {
      id: 12,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work12.jpg",
    },
    {
      id: 13,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work13.jpg",
    },
    {
      id: 14,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work14.jpg",
    },
    {
      id: 15,
      title: "PROJECT_NAME",
      client: "CLIENTS",
      category: "COLOR GRADING",
      imageUrl: "/assets/works/work15.jpg",
    },
  ];

  // Filter works based on active category
  const filteredWorks = works.filter((work) =>
    activeFilter === "ALL PROJECT" ? true : work.category === activeFilter
  );

  return (
    <div className={styles.works}>
      <div className="w-full mx-auto px-4 py-16">
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
                    className={`px-4 py-2 rounded ${
                      activeFilter === category
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-[#787878]"
                    }`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
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
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                          activeFilter === category
                            ? "bg-black text-white"
                            : "bg-[#F0F0F0] text-[#787878]"
                        }`}
                        onClick={() => setActiveFilter(category)}
                      >
                        {category}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="overflow-hidden">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                      />
                    </div>
                    <div className="mt-[20px] flex justify-between workInfo">
                      <div className="text-black">
                        <span className="pre">I</span>
                        <span className="workTitle">{work.title}</span>
                        <span className="divider">&nbsp;I&nbsp;</span>
                        <span>{work.client}</span>
                      </div>
                      <div className="text-[#B4B4B4]">{work.category}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <FadeInSection delay={0.3}>
          <div className="w-full mb-[155px]">
            <div className="mt-[122px] text-left max-w-[574px]   lg:text-[20px] text-[20px] lg:leading-[110%] leading-[100%] font-medium text-black">
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
