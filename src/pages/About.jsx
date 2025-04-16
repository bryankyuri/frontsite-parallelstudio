import React, { useContext, useState } from "react";
import styles from "../styles/About.module.scss";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../components/FadeInSection";
import { Link } from "react-router-dom";

const About = () => {
  const { deviceType } = useContext(AppContext);
  // Initialize with the first accordion open
  const [openAccordions, setOpenAccordions] = useState({ "01": true });

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const services = [
    {
      id: "01",
      title: "COLOR GRADING & FINISHING",
      description:
        "Our infrastructure allows our color artists to work in every format—2K, 4K, DPX, Open EXR, .r3dnative, anything you can bring to our shop—and tailor the look for any delivery specification. Allstudios are designed to work in any and every workflow & format you need, from the traditional standard of ACES, 10-bit DPX to 16-bit Open EXR.",
    },
    {
      id: "02",
      title: "REMOTE COLOR GRADING",
      description:
        "Our infrastructure allows our color artists to work in every format—2K, 4K, DPX, Open EXR, .r3dnative, anything you can bring to our shop—and tailor the look for any delivery specification. Allstudios are designed to work in any and every workflow & format you need, from the traditional standard of ACES, 10-bit DPX to 16-bit Open EXR.",
    },
    {
      id: "03",
      title: "ONLINE EDITING (VFX)",
      description:
        "Our infrastructure allows our color artists to work in every format—2K, 4K, DPX, Open EXR, .r3dnative, anything you can bring to our shop—and tailor the look for any delivery specification. Allstudios are designed to work in any and every workflow & format you need, from the traditional standard of ACES, 10-bit DPX to 16-bit Open EXR.",
    },
    {
      id: "04",
      title: "DRY HIRE",
      description:
        "Our infrastructure allows our color artists to work in every format—2K, 4K, DPX, Open EXR, .r3dnative, anything you can bring to our shop—and tailor the look for any delivery specification. Allstudios are designed to work in any and every workflow & format you need, from the traditional standard of ACES, 10-bit DPX to 16-bit Open EXR.",
    },
  ];

  return (
    <div className={styles.about}>
      <section
        className={`w-full bg-black text-white py-32 relative ${styles.heroBanner} flex lg:justify-center lg:items-center justify-start items-end`}
        style={{
          height:
            deviceType === "desktop"
              ? "calc(100vh - 62px)"
              : "calc(100vh - 66px)",
          backgroundImage: `url('/hero-banner-about.png')`,
          backgroundSize: deviceType === "desktop" ? "100% auto" : "auto 100%",
          backgroundPosition: `center 0px`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto lg:text-center z-[2] relative lg:px-0 px-5 ">
          <h1 className="lg:text-[40px] text-[36px] leading-[115%] font-bold">
            {deviceType === "desktop" ? (
              <>
                WE EAGER TO PARTNER WITH
                <br />
                GREAT STORYTELLER
              </>
            ) : (
              <>
                WE EAGER TO <br />
                PARTNER WITH
                <br />
                GREAT
                <br /> STORYTELLER
              </>
            )}
          </h1>
        </div>
      </section>
      <FadeInSection delay={0.3}>
        <section className="company-intro py-20">
          <div className="container mx-auto px-6">
            <p className="w-full lg:max-w-[670px] mx-auto lg:text-center text-justify px-[40px] lg:px-0 mb-[140px] lg:mt-[140px] mt-[90px] text-[#969696] lg:text-[16px] text-[14px] leading-[120%]">
              Founded in 2019, Parallel Studio is a Jakarta-based
              post-production company that specializes in delivering
              high-quality content across a wide range of media. What began as a
              passion for enhancing TV commercials and music videos has grown
              into a deep commitment to storytelling through the art of color
              grading and visual effects (VFX).
              <br />
              <br />
              Our journey took an exciting turn in 2022 when we ventured into
              the world of short films. Since then, we've expanded our
              portfolio, working with prominent film production houses on a
              variety of projects including TV series, feature films,
              documentaries, and short films. Every frame we touch is a
              reflection of our dedication to detail and our pursuit of
              cinematic excellence.
            </p>
          </div>
        </section>
      </FadeInSection>

      <section className="services py-20" id="our-services">
        <div className="w-full px-5">
          <h2 className="font-bold pb-20 text-black">OUR SERVICES</h2>
          <div className="space-y-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-item border-b border-black"
              >
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="flex justify-between items-start w-full"
                >
                  <span className="min-w-[30px] max-w-[30px] lg:text-[32px] text-[24px] font-semibold mr-8 leading-[120%]">
                    {service.id}
                  </span>
                  <div className="w-full">
                    <h3 className="text-left lg:text-[32px] text-[24px] font-bold mb-5 text-black leading-[120%]">
                      {service.title}
                    </h3>
                  </div>
                  <div className="lg:min-w-[32px] lg:max-w-[32px] min-w-[25px] max-w-[25px] font-medium text-black text-center transition-transform duration-300">
                    {openAccordions[service.id] ? "-" : "+"}
                  </div>
                </button>

                <AnimatePresence>
                  {openAccordions[service.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-between mb-5">
                        <div className="max-w-[30px] min-w-[30px] mr-8"></div>
                        <div className="text-[#969696] text-[14px] lg:text[16px] w-full  leading-[120%] flex justify-start">
                          <p className="w-full lg:max-w-[822px] text-justify">
                            {service.description}
                          </p>
                        </div>
                        <div className="lg:min-w-[32px] lg:max-w-[32px] min-w-[25px] max-w-[25px]"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

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
  );
};

export default About;
