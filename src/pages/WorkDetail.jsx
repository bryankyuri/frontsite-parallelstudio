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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const WorkDetail = () => {
  const { workId } = useParams();
  const { deviceType } = useContext(AppContext);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  // Add these state variables at the top of your component
  const [popupImage, setPopupImage] = useState(null);
  const [popupImageIndex, setPopupImageIndex] = useState(0);

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
    category: "film/series", // film/series, commercial
    year: "2024",
    tag: ["MOTION GRAPHIC", "COLOR GRADING", "VFX", "CGI"],
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisi.",
    credits: [
      { role: "Director", name: ["Your Name"] },
      { role: "Producer", name: ["Your Name", "Your Name"] },
      { role: "DOP", name: ["Your Name", "Your Name"] },
      { role: "Colorist", name: ["Your Name", "Your Name"] },
      { role: "Visual Effect", name: ["Your Name", "Your Name", "Your Name"] },
      { role: "Motion Graphic", name: ["Your Name", "Your Name"] },
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
        categories: ["motion graphic", "vfx", "color grading", "cgi"],
        imageUrl: "/assets/works/work1.jpg",
      },
      {
        id: 2,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        categories: ["motion graphic", "vfx", "color grading", "cgi"],
        imageUrl: "/assets/works/work2.jpg",
      },
      {
        id: 3,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        categories: ["motion graphic", "vfx", "color grading", "cgi"],
        imageUrl: "/assets/works/work3.jpg",
      },
      {
        id: 4,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        categories: ["motion graphic", "vfx", "color grading", "cgi"],
        imageUrl: "/assets/works/work4.jpg",
      },
      {
        id: 5,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        categories: ["motion graphic", "vfx", "Color grading", "cgi"],
        imageUrl: "/assets/works/work5.jpg",
      },
    ],
  };
  // Add this function to handle image clicks
  const handleImageClick = (imageUrl, index = 0) => {
    setPopupImage(imageUrl);
    setPopupImageIndex(index);
    // Prevent body scroll when popup is open
    document.body.style.overflow = "hidden";
  };

  // Add this function to close popup
  const closePopup = () => {
    setPopupImage(null);
    setPopupImageIndex(0);
    // Restore body scroll
    document.body.style.overflow = "";
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!popupImage) return;

      if (e.key === "Escape") {
        closePopup();
      } else if (
        e.key === "ArrowLeft" &&
        Array.isArray(popupImage) &&
        popupImageIndex > 0
      ) {
        setPopupImageIndex(popupImageIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        Array.isArray(popupImage) &&
        popupImageIndex < popupImage.length - 1
      ) {
        setPopupImageIndex(popupImageIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [popupImage, popupImageIndex]);

  // Update your renderImage function
  const renderImage = (type, imageUrl) => {
    switch (type) {
      case "full-width":
        return (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={work.title}
              className="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(imageUrl)}
            />
          </div>
        );
      case "2col-full":
        return (
          <div className="grid grid-cols-2 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work.title}
                className="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(imageUrl, index)}
              />
            ))}
          </div>
        );
      case "compare-full":
        return (
          <div className="w-full relative">
            {/* Create a proper sticky container with background */}
            <div className="sticky top-[62px] z-20 w-full bg-opacity-10 pt-4 px-[10px]">
              <div className="flex justify-between items-center">
                {sliderPosition !== 0 && (
                  <button
                    onClick={() => !isAnimating && animateSlider(100)}
                    className="bg-black bg-opacity-70 text-white lg:px-3 px-2 py-1 lg:text-sm text-xs font-medium rounded transition-opacity duration-300"
                    disabled={isAnimating}
                  >
                    BEFORE
                  </button>
                )}

                {sliderPosition < 99 && (
                  <button
                    onClick={() => !isAnimating && animateSlider(0)}
                    className="bg-black bg-opacity-70 text-white lg:px-3 px-2 py-1 lg:text-sm text-xs font-medium rounded transition-opacity duration-300 ml-auto"
                    disabled={isAnimating}
                  >
                    AFTER
                  </button>
                )}
              </div>
            </div>

            {/* The compare slider below the sticky header */}
            <div className="mt-[-40px]">
              <div
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(imageUrl)}
              >
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
                  onlyHandleDraggable={true}
                />
              </div>
            </div>
          </div>
        );
      case "2col-4:5":
        return (
          <div className="grid grid-cols-2 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work.title}
                className="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(imageUrl, index)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Add the ImagePopup component here, before the return statement
  const ImagePopup = () => {
    if (!popupImage) return null;

    const isArrayImage = Array.isArray(popupImage);
    const currentImage = isArrayImage
      ? popupImage[popupImageIndex]
      : popupImage;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={closePopup}
      >
        <div className="relative max-w-full max-h-full">
          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-white text-2xl z-10 hover:opacity-70 transition-opacity"
          >
            ✕
          </button>

          {/* Navigation arrows for array images */}
          {isArrayImage && popupImage.length > 1 && (
            <>
              {popupImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupImageIndex(popupImageIndex - 1);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:opacity-70 transition-opacity z-10"
                >
                  ‹
                </button>
              )}
              {popupImageIndex < popupImage.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupImageIndex(popupImageIndex + 1);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:opacity-70 transition-opacity z-10"
                >
                  ›
                </button>
              )}
            </>
          )}

          {/* Image counter for array images */}
          {isArrayImage && popupImage.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {popupImageIndex + 1} / {popupImage.length}
            </div>
          )}

          {/* Main image */}
          <img
            src={currentImage}
            alt={work.title}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
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
        <div className="w-full px-5">
          <div className="flex gap-2">
            <div className="font-semibold text-white bg-black px-2 py-1 rounded-[4px]">
              #
            </div>
            {work.tag.map((item, index) => (
              <div
                key={index}
                className="font-semibold text-white bg-black px-2 py-1 rounded-[4px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:text-[20px] text-[14px] text-black mx-auto px-5 flex my-[20px] lg:justify-end lg:flex-row flex-col-reverse border-b ">
          <div className="w-full  border-t lg:border-t-0 border-b border-black">
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px]">CLIENT</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium">
                  {work.client}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px] ">TITLE</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium">
                  {work.title}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px] ">CATEGORY</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium capitalize">
                  {work.category}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px] ">DESC.</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] text-justify font-medium">
                  {work.description}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex pt-2 lg:pt-5 ">
                <div className="w-[68px] lg:mr-[60px] mr-[24px]">CREDITS</div>
                <div className="w-full  font-medium">
                  {work.credits.map((creditsItem, index) => (
                    <div
                      className={`w-full ${
                        work.credits.length - 1 !== index
                          ? "pb-2 border-b border-black lg:pb-5 mb-2 lg:mb-5"
                          : "pb-2 border-b border-black lg:pb-5"
                        // "pb-2 border-b border-black lg:pb-5 mb-2 lg:mb-5"
                      }`}
                    >
                      <div
                        className={`lg:w-[calc(50%-120px)] w-[calc(100%-76px)] grid grid-cols-2 gap-2`}
                      >
                        <div className="w-full">{creditsItem.role}</div>
                        <div className="w-full grid grid-cols-1 gap-y-4">
                          {creditsItem.name.map((item, index) => (
                            <div key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[52px] mr-[24px] ">©</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium">
                  {work.year}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
        <FadeInSection delay={0.3}>
          <div id="ShowReel" className="lg:mb-[10px] mb-[10px]">
            <div
              className="relative w-full"
              style={{
                paddingBottom:
                  deviceType === "desktop"
                    ? "calc(56.25% - 62px)"
                    : "calc(86.25% - 62px)",
              }}
            >
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://videos.virtual-app.my.id/tokpedia_ramadhan.mp4"
                controls
                controlsList="nodownload noplaybackrate"
                playsInline
                preload="metadata"
                style={{ borderRadius: "0px" }}
                onError={(e) => {
                  console.log("Showreel video failed to load:", e);
                }}
                onLoadedData={() => {
                  console.log("Showreel video loaded successfully");
                }}
                onPlay={(e) => {
                  // Auto fullscreen when video starts playing
                  if (e.target.requestFullscreen) {
                    e.target.requestFullscreen().catch((err) => {
                      console.log("Fullscreen request failed:", err);
                    });
                  } else if (e.target.webkitRequestFullscreen) {
                    e.target.webkitRequestFullscreen();
                  } else if (e.target.msRequestFullscreen) {
                    e.target.msRequestFullscreen();
                  }
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </FadeInSection>
        {/* Project Details */}
        <div className="w-full mx-auto lg:px-[10px]">
          {work.images.map((image) => (
            <div key={image.id} className="mb-[10px]">
              <FadeInSection delay={0.3}>
                {renderImage(image.type, image.imageUrl)}
              </FadeInSection>
            </div>
          ))}
        </div>

        {/* More Works */}
        <div className="mt-[40px] mb-[80px] lg:mt-[20px] lg:mb-[100px] lg:pt-[10px] w-full ">
          <FadeInSection delay={0.3}>
            <h2 className="px-[10px] lg:text-[20px] text-[16px] text-black font-bold text-left mb-[10px] ">
              <div className="w-full hidden lg:block lg:pt-[20px] lg:border-t border-black"></div>
              MORE WORKS
            </h2>
          </FadeInSection>
          <div className="w-full">
            <Swiper
              slidesPerView={2.2}
              spaceBetween={10}
              className="w-full px-[10px]"
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2.1,
                  spaceBetween: 10,
                },
              }}
            >
              {work.relatedWorks.map((workItem, index) => (
                <SwiperSlide key={`second-row-${index}`}>
                  <Link to={`/works/${workItem.id}`} className="workItem block">
                    <div className="overflow-hidden">
                      <div className="overflow-hidden relative">
                        <img
                          src={workItem.imageUrl}
                          alt={workItem.title}
                          className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                        />
                        {/* <div
                          className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end uppercase px-[15px] py-5"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)",
                          }}
                        > */}
                        {/* {workItem.categories
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
                            })} */}
                        {/* </div> */}
                      </div>
                      <div className="mt-[10px] flex justify-between workInfo">
                        <div className="text-black">
                          <span className="pre">I</span>
                          <span className="workTitle">{workItem.title}</span>
                          <span className="divider">&nbsp;I&nbsp;</span>
                          <span>{workItem.client}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Add this popup component at the end of your return statement, before the closing </div> */}
      <ImagePopup />
    </div>
  );
};

export default WorkDetail;
