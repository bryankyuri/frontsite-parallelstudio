import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/WorkDetail.module.scss";
import stylesWork from "../styles/Works.module.scss";
import { AppContext } from "../context/AppContext";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { IconMoveToCenter } from "../components/Icon/MoveToCenter";
import { FadeInSection } from "../components/FadeInSection";

const WorkDetail = () => {
  const { workId } = useParams();
  const { deviceType } = useContext(AppContext);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  // Animation function for smooth slider transitions
  const animateSlider = (targetPosition) => {
    setIsAnimating(true);
    const startPosition = sliderPosition;
    const duration = 600; // animation duration in milliseconds
    const startTime = performance.now();

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Animation function
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smoother animation
      const easeInOutCubic = (progress) =>
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newPosition =
        startPosition +
        (targetPosition - startPosition) * easeInOutCubic(progress);

      setSliderPosition(newPosition);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSliderPosition(targetPosition);
        setIsAnimating(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mock data - in a real app, you would fetch this based on the workId
  const work = {
    id: workId,
    title: "Video Title",
    client: "Client Name",
    year: "2024",
    credits: [
      { role: "Director", name: "Your Name" },
      { role: "Producer", name: "Your Name" },
      { role: "DOP", name: "Your Name" },
      { role: "Colorist", name: "Your Name" },
      { role: "Visual Effect", name: "Your Name" },
      { role: "Motion Graphic", name: "Your Name" },
    ],
    images: [
      {
        id: "01",
        type: "full-width",
        imageUrl: "/assets/workDetail/work1.jpg",
      },
      {
        id: "02",
        type: "2col-full",
        imageUrl: [
          "/assets/workDetail/work2.jpg",
          "/assets/workDetail/work3.jpg",
        ],
      },
      {
        id: "03",
        type: "2col-full",
        imageUrl: [
          "/assets/workDetail/work4.jpg",
          "/assets/workDetail/work5.jpg",
        ],
      },
      {
        id: "04",
        type: "compare-full",
        imageUrl: [
          "/assets/workDetail/work6B.jpg",
          "/assets/workDetail/work6.jpg",
        ],
      },
      {
        id: "05",
        type: "2col-4:5",
        imageUrl: [
          "/assets/workDetail/work7.jpg",
          "/assets/workDetail/work8.jpg",
        ],
      },
      {
        id: "06",
        type: "full-width",
        imageUrl: "/assets/workDetail/work9.jpg",
      },
    ],
    relatedWorks: [
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
    ],
  };
  const renderImage = (type, imageUrl) => {
    switch (type) {
      case "full-width":
        return (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={work.title}
              className="w-full object-cover"
            />
          </div>
        );
      case "2col-full":
        return (
          <div className="grid grid-cols-2 lg:gap-5 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work.title}
                className="w-full object-cover"
              />
            ))}
          </div>
        );
      case "compare-full":
        return (
          <div className="w-full relative">
            {/* Create a proper sticky container with background */}
            <div className="sticky top-[62px] z-20 w-full bg-opacity-10 pt-4 px-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => !isAnimating && animateSlider(100)}
                  className="bg-black bg-opacity-70 text-white lg:px-3 px-2 py-1 lg:text-sm text-xs font-medium rounded transition-opacity duration-300"
                  disabled={isAnimating}
                >
                  BEFORE
                </button>

                <button
                  onClick={() => !isAnimating && animateSlider(50.25)}
                  className="bg-black bg-opacity-70 text-white lg:px-2 px-2 py-1 lg:text-sm text-xs font-medium rounded transition-opacity duration-300 ml-auto"
                  disabled={isAnimating}
                >
                  <IconMoveToCenter />
                </button>

                <button
                  onClick={() => !isAnimating && animateSlider(0)}
                  className="bg-black bg-opacity-70 text-white lg:px-3 px-2 py-1 lg:text-sm text-xs font-medium rounded transition-opacity duration-300 ml-auto"
                  disabled={isAnimating}
                >
                  AFTER
                </button>
              </div>
            </div>

            {/* The compare slider below the sticky header */}
            <div className="mt-[-40px]">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={imageUrl[0]}
                    alt="Before"
                    className="w-full object-cover"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={imageUrl[1]}
                    alt="After"
                    className="w-full object-cover"
                  />
                }
                position={sliderPosition}
                onPositionChange={(position) => {
                  if (!isAnimating) {
                    setSliderPosition(position);
                  }
                }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          </div>
        );
      case "2col-4:5":
        return (
          <div className="grid grid-cols-2 lg:gap-5 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work.title}
                className="w-full object-cover"
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.workDetail}>
      <div className="w-full mx-auto">
        <div
          className={`w-full bg-black text-white relative ${styles.heroBanner} lg:mb-5 mb-[10px]`}
          style={{
            height:
              deviceType === "desktop"
                ? "calc(100vh - 62px)"
                : "calc(100vh - 66px)",
            backgroundImage: `url('/hero-banner-detailwork.jpg')`,
            backgroundSize:
              deviceType === "desktop" ? "100% auto" : "auto 100%",
            backgroundPosition:
              deviceType === "desktop" ? `center 0px` : "center 0px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Project Details */}
        <div className="w-full mx-auto lg:px-5">
          {work.images.map((image) => (
            <div key={image.id} className="lg:mb-5 mb-[10px]">
              <FadeInSection delay={0.3}>
                {renderImage(image.type, image.imageUrl)}
              </FadeInSection>
            </div>
          ))}
        </div>

        <div className="w-full lg:text-[24px] text-[14px] text-black mx-auto px-5 flex mt-20 mb-20 lg:mb-5 lg:justify-end lg:flex-row flex-col-reverse border-b ">
          <div className="w-full lg:border-b border-black"></div>
          <div className="w-full  border-t lg:border-t-0 border-b border-black">
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[35%]">CLIENT</div>
                <div className="w-full font-medium">{work.client}</div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5 ">
                <div className="w-[35%]">TITLE</div>
                <div className="w-full font-medium">
                  <div
                    className="border-b border-black pb-2 lg:pb-5 
                  lg:min-h-[91px] min-h-[71px]"
                  >
                    {work.title}
                  </div>
                  <div className="pt-2 lg:pt-5">{work.year}</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex  py-2 lg:py-5 ">
                <div className="w-[35%]">CREDITS</div>
                <div className="w-full font-medium">
                  {work.credits.map((creditsItem, index) => (
                    <div
                      className={`${
                        work.credits.length - 1 !== index
                          ? "border-b border-black pb-2 lg:pb-5 mb-2 lg:mb-5"
                          : ""
                      }   grid grid-cols-2 gap-2`}
                    >
                      <div className="w-full">{creditsItem.name}</div>
                      <div className="w-full">{creditsItem.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* More Works */}
        <div className="mb-20 lg:mb-40 px-5">
          <FadeInSection delay={0.3}>
            <h2 className="lg:text-[24px] text-[16px] font-bold text-left mb-10 text-black">
              MORE WORKS
            </h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {work.relatedWorks.map((work, index) => (
              <Link to={`/works/${work.id}`} className={stylesWork.workItem}>
                <FadeInSection delay={0.3 + (index + 1) * 0.1}>
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
                </FadeInSection>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
