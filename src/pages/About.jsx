import React, { useContext, useState } from "react";
import styles from "../styles/About.module.scss";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../components/FadeInSection";
import { Link } from "react-router-dom";
import { IconTriangle } from "../components/Icon/IconTriangle";

const About = () => {
  const { deviceType } = useContext(AppContext);
  // Initialize with the first accordion open
  const [openAccordions, setOpenAccordions] = useState({ "01": true });
  const [openAccordionsJob, setOpenAccordionsJob] = useState("01");

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const toggleAccordionJob = (id) => {
    setOpenAccordionsJob(id);
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
        " Our team are keen to work with fellow artists and storytellers around the globe. With todays technology we are not bound to physical meetings. Work with us. From your couch.",
    },
    {
      id: "03",
      title: "ONLINE EDITING (VFX)",
      description:
         "Our studio is home to a dynamic team of 2D artists, designers, motion graphics specialists, compositors, and 3D artists, all dedicated to bringing your vision to life through exceptional visual effects and post-production artistry.",
    },
    {
      id: "04",
      title: "DRY HIRE",
      description:
        " For artists and collaborators who are looking for workplace to finish their projects. Local and foreign people who are happen to stay in Indonesia are welcome in our place.",
    },
  ];

  const team = [
    {
      id: "01",
      name: "Dwi Agung Pambudi",
      jobDesk: "Managing Director, Co-founder",
      imgUrl: "/assets/team/new/team_1.jpg",
    },
    {
      id: "02",
      name: "",
      jobDesk: "",
      imgUrl: "/assets/team/team_2.jpg",
    },
    {
      id: "03",
      name: "Kenzo Miyake",
      jobDesk: "Senior Colorist, Co-founder",
      imgUrl: "/assets/team/new/team_2.jpg",
    },
    {
      id: "04",
      name: "Yuda Gustian",
      jobDesk: "Executive Producer",
      imgUrl: "/assets/team/new/team_3.jpg",
    },
    {
      id: "05",
      name: "",
      jobDesk: "",
      imgUrl: "/assets/team/team_5.jpg",
    },
    {
      id: "06",
      name: "Fian Firyanto",
      jobDesk: "Finance",
      imgUrl: "/assets/team/new/team_4.jpg",
    },
    {
      id: "07",
      name: "",
      jobDesk: "",
      imgUrl: "/assets/team/team_7.jpg",
    },
    {
      id: "08",
      name: "M. Irvan Setiawan",
      jobDesk: "Senior VFX artist, Compositor",
      imgUrl: "/assets/team/new/team_5.jpg",
    },
    {
      id: "09",
      name: "Alvin Rizkyadi",
      jobDesk: "Junior Colorist",
      imgUrl: "/assets/team/new/team_6.jpg",
    },
    {
      id: "10",
      name: "Michael Thung",
      jobDesk: "Junior VFX artist",
      imgUrl: "/assets/team/new/team_7.jpg",
    },
    {
      id: "11",
      name: "Irwan Syahrani",
      jobDesk: "Post Producer",
      imgUrl: "/assets/team/new/team_8.jpg",
    },
    {
      id: "12",
      name: "",
      jobDesk: "",
      imgUrl: "/assets/team/team_12.jpg",
    },
  ];

  const job = [
    {
      id: "01",
      name: "producer",
      requirement: "A well-coordinated team & timely project delivery",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "02",
      name: "director",
      requirement: "Clear creative direction and a cohesive final product.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "03",
      name: "editor",
      requirement: "A polished and engaging final cut.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "04",
      name: "vfx artist",
      requirement:
        "High-quality, realistic visual effects that enhance the storytelling.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "05",
      name: "sound designer",
      requirement: "Immersive soundscapes that BRING the project TO LIVE.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "06",
      name: "cinematographer",
      requirement: "Stunning visuals that align with the director’s vision.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
    },
    {
      id: "07",
      name: "scriptwriter",
      requirement:
        "A compelling and structured script that drives the project.",
      description:
        "Oversees the project, manages schedules, and ensures smooth collaboration. Requires leadership and communication skills.",
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
          backgroundImage: `url('/hero-banner-about.jpg')`,
          backgroundSize: deviceType === "desktop" ? "100% auto" : "auto 100%",
          backgroundPosition: `center 0px`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full mx-auto lg:text-center z-[2] relative lg:px-0 px-5 ">
          <h1 className="lg:text-[40px] text-[36px] leading-[115%] font-bold">
            <FadeInSection delay={0.3}>
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
            </FadeInSection>
          </h1>
        </div>
      </section>
      <FadeInSection delay={0.3}>
        <section className="company-intro py-20">
          <div className="w-full mx-auto px-6">
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
        <div className="w-full px-[10px]">
          <FadeInSection delay={0.3}>
            <h2 className="  lg:text-[20px] text-[16px] font-bold pb-20 text-black">
              OUR SERVICES
            </h2>
          </FadeInSection>
          <div className="space-y-5">
            {services.map((service) => (
              <FadeInSection delay={0.3} key={service.id}>
                <div className="service-item border-b border-black">
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
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="services py-20" id="our-services">
        <div className="w-full px-[10px]">
          <FadeInSection delay={0.3}>
            <h2 className="  lg:text-[20px] text-[16px] font-bold mb-5 text-black">
              OUR TEAM
            </h2>
          </FadeInSection>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-[10px] gap-y-5">
            {team.map((member) => (
              <FadeInSection delay={0.3} key={member.id}>
                <div className="team-item flex flex-col text-left">
                  <div className="overflow-hidden">
                    <img
                      src={member.imgUrl}
                      alt={member.name}
                      className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                    />
                  </div>
                  <h3 className="text-[16px] font-medium mt-5 text-black leading-[100%] uppercase">
                    {member.name}
                  </h3>
                  <p className="text-[#787878] text-[16px] leading-[100%] uppercase">
                    {member.jobDesk}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      <FadeInSection delay={0.3}>
        <section className="services py-20" id="send-portofolio">
          <div className="w-full px-[10px] flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-[80%] w-full">
              <button className="w-[246px] h-[51px] flex justify-center items-center border bg-black border-black  text-white hover:bg-white hover:border-black  hover:text-black font-semibold rounded mb-10 transition-all duration-[0.3s]">
                SEND US YOUR PORTFOLIO
              </button>
            </div>
            <div className="w-full text-left">
              <div className="font-bold leading-[120%] text-[24px] lg:text-[32px] text-black uppercase">
                {deviceType === "desktop" ? (
                  <>
                    Got a story to tell? Share your <br />
                    portfolio and let’s hone it to
                    <br /> perfection.
                  </>
                ) : (
                  <>
                    Got a story to tell?
                    <br />
                    Share your portfolio
                    <br />
                    and let’s hone it to
                    <br />
                    perfection.
                  </>
                )}
              </div>
            </div>
            <div className="h-[16px] w-[16px]"></div>
          </div>
        </section>
      </FadeInSection>
      {/* <section className="services pb-20" id="our-services">
        <div className="w-full ">
          <div className="">
            {job.map((jobItem) => (
              <FadeInSection delay={0.3} key={jobItem.id}>
                <div className="service-item border-b border-[#D2D2D2]">
                  <button
                    onClick={() => toggleAccordionJob(jobItem.id)}
                    className={`px-[10px] py-1 flex justify-between text-left items-center w-full transition-all duration-[0.3s] ${
                      openAccordionsJob === jobItem.id
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <span className="lg:w-[80%] w-full font-semibold  uppercase">
                      {jobItem.name}
                    </span>
                    {deviceType === "desktop" && (
                      <div className="w-full">
                        <h3 className="w-full font-semibold uppercase">
                          {jobItem.requirement}
                        </h3>
                      </div>
                    )}
                    <div
                      className={`h-[16px] w-[16px] flex justify-center items-center ${
                        openAccordionsJob === jobItem.id
                          ? "invert rotate-180"
                          : ""
                      } transition-all duration-[0.3s]`}
                    >
                      <IconTriangle />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openAccordionsJob === jobItem.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {deviceType === "desktop" ? (
                          <div className="flex justify-between mb-5">
                            <div className="w-[80%] "></div>
                            <div className="text-[#969696] text[16px] w-full  leading-[120%] flex justify-start">
                              <p className="w-full lg:max-w-[525px] text-justify mt-5 mb-10">
                                {jobItem.description}
                              </p>
                            </div>
                            <div className="h-[16px] w-[16px]"></div>
                          </div>
                        ) : (
                          <div className="text-[#969696] text-[14px] px-5 w-full  leading-[120%] ">
                            <div className="w-full my-5 text-black">
                              <h3 className="w-full font-semibold uppercase">
                                {jobItem.requirement}
                              </h3>
                            </div>
                            <p className="w-full text-justify  mb-10">
                              {jobItem.description}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section> */}

      <FadeInSection delay={0.3}>
        <div className="px-[10px] w-full mb-[155px]">
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
  );
};

export default About;
