import React, { useContext, useState } from "react";
import styles from "../styles/Contact.module.scss";
import { AppContext } from "../context/AppContext";
import { FadeInSection } from "../components/FadeInSection";

const Contact = () => {
  const { deviceType, vh } = useContext(AppContext);

  return (
    <div className={styles.contact}>
      <FadeInSection delay={0.3}>
        <div className="w-full lg:text-center px-5 py-20 leading-[120%] text-black font-bold lg:text-[40px] text-[36px] uppercase">
          {deviceType === "desktop" ? (
            <>Collaborate? Or maybe join our team of artists</>
          ) : (
            <div>
              Collaborate?
              <br /> Or maybe join
              <br /> our team of
              <br /> artists
            </div>
          )}
        </div>
      </FadeInSection>
      <FadeInSection delay={0.3}>
        <div
          className={`w-full bg-black text-white py-32 relative ${styles.heroBanner} flex lg:justify-center lg:items-center justify-start items-end mb-[140px] lg:mb-[420px]`}
          style={{
            height:
              deviceType === "desktop"
                ? "calc(100vh - 62px)"
                : "calc(100vh - 66px)",
            backgroundImage: `url('/hero-banner-contact.jpg')`,
            backgroundSize:
              deviceType === "desktop" ? "100% auto" : "auto 100%",
            backgroundPosition:
              deviceType === "desktop" ? `center 0px` : "90% 0px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </FadeInSection>
      <FadeInSection delay={0.3}>
        <section className=" w-full px-5 mb-[148px] lg:mb-0" id="contact-form">
          <div className="lg:w-1/2 w-full">
            <div className="  lg:text-[20px] text-[16px] font-semibold text-black mb-10">
              SEND A MESSAGE
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-5 grid-cols-1">
              <input
                className="outline-none border-b border-black pb-2 mb-2 text-[14px] lg:text-[16px] text-black"
                placeholder="NAME"
              />
              <input
                className="outline-none border-b border-black pb-2 mb-2 text-[14px] lg:text-[16px] text-black"
                placeholder="EMAIL"
              />
            </div>
            <div className="w-full lg:pt-[50px] pb-2 border-b border-black ">
              <textarea
                className="w-full outline-none  text-[14px] lg:text-[16px] text-black h-[179px] overflow-auto"
                placeholder="MESSAGE"
              />
            </div>
            <div className="w-full lg:py-5 py-2 border-b border-black lg:border-none">
              <button className="w-full text-[14px] lg:text-[16px] outline-none font-bold text-black text-left">
                SUBMIT
              </button>
              <div />
            </div>
          </div>
        </section>
      </FadeInSection>

    </div>
  );
};

export default Contact;
