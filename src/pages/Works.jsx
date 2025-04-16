import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Works.module.scss";

const FadeInSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const Works = () => {
  const [activeFilter, setActiveFilter] = useState("ALL PROJECT");

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
      <div className="container mx-auto px-4 py-16">
        <FadeInSection>
          <h1 className="text-[40px] text-black font-bold mb-[80px] text-center">
            WORKS
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="flex justify-center mb-[151px] space-x-4">
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
          </div>

          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredWorks.map((work, index) => (
                <motion.div
                  layout
                  key={work.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.5,
                    layout: { type: "spring", stiffness: 200, damping: 25 }
                  }}
                  className="w-full"
                >
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </FadeInSection>

        {/* CTA Section */}
        <FadeInSection delay={0.3}>
          <div className="mt-[122px] text-left max-w-[574px] text-[24px] leading-[110%] font-medium text-black">
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
            className="inline-block border rounded bg-[#F0F0F0] text-[#787878] mt-[20px] px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors"
          >
            GET IN TOUCH
          </Link>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Works;
