import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ deviceType }) => {
  return (
    <footer className="px-[10px]">
      <div className="w-full mx-auto lg:pt-5 lg:border-t lg:border-black flex lg:flex-row flex-col items-start justify-between text-black">
        <div className="w-full">
          <img
            className=" invert"
            src="/logo.png"
            alt="Logo"
            width={"198px"}
            height={"auto"}
          />
        </div>
        <div className="w-full">
          <div className="font-semibold mb-10 lg:mt-0 mt-10">OFFICE</div>
          <div className="mb-10 uppercase">
            Jl. Damai II No.2G
            <br />
            Cipete Utara, KEBAYORAN Baru,
            <br />
            Jakarta Selatan 12150
            <br />
            INDONESIA
            <br />
          </div>
          <div className="flex">
            <div className="mr-[87px]">P</div>
            <a
              href="https://wa.me/628128263544"
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer no-underline text-black"
            >
              <span className="mr-6">+62</span>
              <span>812 8626 3544</span>
            </a>
          </div>
          <div className="flex">
            <div className="mr-[83px]">M</div>
            <a
              href="mailto:INFO@PARALLEL.ASIA"
              className="cursor-pointer no-underline text-black"
            >
              <span>INFO@PARALLEL.ASIA</span>
            </a>
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold mb-10 lg:mt-0 mt-10">SOCIAL</div>
          <div className="flex flex-col">
            <a
              href="https://www.instagram.com/parallel__studio"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:border-none border-t border-black lg:py-0 py-2"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.youtube.com/channel/UC2Zqwr38NBP6ZDeccHtP1HQ"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:border-none border-t border-black lg:py-0 py-2"
            >
              YOUTUBE
            </a>
          </div>
        </div>
        <div className="w-[70%] text-right">
          <div className="font-semibold mb-10"></div>
        </div>
      </div>
      {deviceType === "desktop" ? (
        <div className="w-full flex justify-between py-5 text-[10px] font-semibold text-black mt-[117px]">
          <div className="w-full">©2024</div>
          <div className="w-full">SITE BY PLAYGROUND STUDIO</div>
          <div className="w-full"></div>
          <div className="w-[70%] text-right">THE HAGUE, THE NETHERLANDS</div>
        </div>
      ) : (
        <div className="w-full flex justify-between py-5 text-[10px] font-semibold text-black mt-[227px]">
          <div className="text-left">
            ©2024
            <br />
            SITE BY PLAYGROUND STUDIO
          </div>
          <div className="text-right">
            THE HAGUE,
            <br />
            THE NETHERLANDS
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
