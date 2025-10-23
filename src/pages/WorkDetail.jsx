import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/WorkDetail.module.scss";
import stylesWork from "../styles/Works.module.scss";
import { AppContext } from "../context/AppContext";
import { useWorkDetail } from "../hooks/useWorkDetail";
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
  const [popupFlatIndex, setPopupFlatIndex] = useState(null); // Track position in flattened array
  const [activeVideoTab, setActiveVideoTab] = useState("uploaded");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track if video is playing
  const [hasVideoStarted, setHasVideoStarted] = useState(false); // Track if video has been played at least once
  const [heroBannerFillMode, setHeroBannerFillMode] = useState(
    deviceType === "desktop" ? "100% auto" : "auto 100%"
  );

  // Fetch work detail using TanStack Query (includes related works)
  const {
    data: workDetailData,
    isLoading: isLoadingWork,
    error: workError,
    isError: isWorkError,
  } = useWorkDetail(workId);

  // Extract work and related works from the API response
  const work = workDetailData?.work;
  const relatedWorksData = workDetailData?.relatedWorks;

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

  // Auto-select first available video tab
  useEffect(() => {
    if (work) {
      if (work.video_project_src) {
        setActiveVideoTab("uploaded");
      } else if (work.video_vimeo_url) {
        setActiveVideoTab("vimeo");
      } else if (work.video_youtube_url) {
        setActiveVideoTab("youtube");
      } else if (work.video_cloudflare_url) {
        setActiveVideoTab("cloudflare");
      }
    }
  }, [work]);

  // Detect if hero banner image fills the container height
  useEffect(() => {
    if (!work?.hero_banner_image) {
      // Set default based on device type
      setHeroBannerFillMode(deviceType === "desktop" ? "100% auto" : "auto 100%");
      return;
    }

    const img = new Image();
    img.src = work.hero_banner_image;
    
    img.onload = () => {
      const imageAspectRatio = img.naturalWidth / img.naturalHeight;
      
      // Check if image is 16:9 (1.777) or 4:3 (1.333)
      const is16by9 = Math.abs(imageAspectRatio - (16/9)) < 0.01; // ~1.777
      const is4by3 = Math.abs(imageAspectRatio - (4/3)) < 0.01; // ~1.333
      const is185by1 = Math.abs(imageAspectRatio - (1.85/1)) < 0.01; // ~1.85

      console.log('Hero Banner Debug:', {
        deviceType,
        imageWidth: img.naturalWidth,
        imageHeight: img.naturalHeight,
        imageAspectRatio: imageAspectRatio.toFixed(3),
        is16by9,
        is4by3,
        is185by1
      });

      if (is16by9 || is4by3 || is185by1) {
        // For 16:9 or 4:3, use the default behavior
        if (deviceType === "desktop") {
          console.log('Using 100% auto (16:9 or 4:3 ratio)');
          setHeroBannerFillMode("100% auto");
        } else {
          console.log('Using auto 100% (16:9 or 4:3 ratio)');
          setHeroBannerFillMode("auto 100%");
        }
      } else {
        // For other ratios, always use auto 100% to fill height
        console.log('Using auto 100% (non-standard ratio)');
        setHeroBannerFillMode("auto 100%");
      }
    };

    img.onerror = () => {
      console.error('Failed to load hero banner image');
      setHeroBannerFillMode(deviceType === "desktop" ? "100% auto" : "auto 100%");
    };
  }, [work, deviceType]);

  // Create a flattened array of all images (excluding comparison types)
  const flattenedImages = React.useMemo(() => {
    if (!work?.gallery_items) return [];
    
    const flattened = [];
    work.gallery_items.forEach((item, galleryIndex) => {
      // Skip comparison types
      if (item.type.startsWith('compare-')) return;
      
      const images = Array.isArray(item.images) ? item.images : [item.images];
      images.forEach((imageUrl, imageIndex) => {
        flattened.push({
          imageUrl,
          galleryIndex,
          imageIndex,
          type: item.type,
          allImages: item.images // Keep reference to all images in this gallery item
        });
      });
    });
    
    return flattened;
  }, [work?.gallery_items]);

  // Add this function to handle image clicks
  const handleImageClick = (imageUrl, index = 0, galleryIndex = null, itemType = null) => {
    // Don't open popup for comparison type images
    if (itemType && itemType.startsWith('compare-')) {
      return;
    }
    
    // Find the position in flattened array
    const flatIndex = flattenedImages.findIndex(
      img => img.galleryIndex === galleryIndex && img.imageIndex === index
    );
    
    setPopupImage(imageUrl);
    setPopupImageIndex(index);
    setPopupFlatIndex(flatIndex >= 0 ? flatIndex : null);
    // Prevent body scroll when popup is open
    document.body.style.overflow = "hidden";
  };

  // Add this function to close popup
  const closePopup = () => {
    setPopupImage(null);
    setPopupImageIndex(0);
    setPopupFlatIndex(null);
    // Restore body scroll
    document.body.style.overflow = "";
  };

  // Helper function to navigate to next/prev image in flattened array
  // Helper function to navigate to next/prev image in flattened array
  const navigateGallery = (direction) => {
    if (popupFlatIndex === null || flattenedImages.length === 0) return;
    
    let newFlatIndex = popupFlatIndex;
    
    if (direction === 'next' && popupFlatIndex < flattenedImages.length - 1) {
      newFlatIndex = popupFlatIndex + 1;
    } else if (direction === 'prev' && popupFlatIndex > 0) {
      newFlatIndex = popupFlatIndex - 1;
    }
    
    // If we moved to a different image, update the popup
    if (newFlatIndex !== popupFlatIndex) {
      const newImageData = flattenedImages[newFlatIndex];
      setPopupImage(newImageData.imageUrl);
      setPopupImageIndex(newImageData.imageIndex);
      setPopupFlatIndex(newFlatIndex);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!popupImage) return;

      if (e.key === "Escape") {
        closePopup();
      } else if (e.key === "ArrowLeft") {
        // Navigate to previous image in flattened array
        navigateGallery('prev');
      } else if (e.key === "ArrowRight") {
        // Navigate to next image in flattened array
        navigateGallery('next');
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [popupImage, popupFlatIndex, flattenedImages]);

  // Helper function to get aspect ratio style
  const getAspectRatioStyle = (type) => {
    // Extract aspect ratio from type and return CSS aspectRatio property
    if (type.includes('16:9')) {
      return { aspectRatio: '16/9' };
    } else if (type.includes('1.85:1')) {
      return { aspectRatio: '1.85/1' };
    } else if (type.includes('2.35:1')) {
      return { aspectRatio: '2.35/1' };
    } else if (type.includes('2.39:1')) {
      return { aspectRatio: '2.39/1' };
    } else if (type.includes('4:3')) {
      return { aspectRatio: '4/3' };
    } else if (type.includes('4:5')) {
      return { aspectRatio: '4/5' }; // Legacy support
    }
    return null;
  };

  // Update your renderImage function
  const renderImage = (type, imageUrl, galleryIndex = null) => {
    // Add safety check for imageUrl
    if (!imageUrl) return null;

    const aspectRatioStyle = getAspectRatioStyle(type);

    // Full Width Images (16:9, 1.85:1, 2.35:1, 2.39:1, 4:3)
    if (type.startsWith('full-')) {
      return (
        <div className="w-full" style={aspectRatioStyle}>
          <img
            src={imageUrl}
            alt={work?.title || "Work image"}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => handleImageClick(imageUrl, 0, galleryIndex, type)}
          />
        </div>
      );
    }

    // Two Column Images (16:9, 1.85:1, 2.35:1, 2.39:1, 4:3)
    if (type.startsWith('2col-')) {
      if (!Array.isArray(imageUrl) || imageUrl.length === 0) return null;
      return (
        <div className="grid grid-cols-2 gap-[10px]">
          {imageUrl.map((url, index) => (
            <div key={index} style={aspectRatioStyle}>
              <img
                src={url}
                alt={work?.title || "Work image"}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(url, index, galleryIndex, type)}
              />
            </div>
          ))}
        </div>
      );
    }

    // Before/After Comparison Images (16:9, 1.85:1, 2.35:1, 2.39:1, 4:3)
    if (type.startsWith('compare-')) {
      if (!Array.isArray(imageUrl) || imageUrl.length < 2) return null;
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
              className="relative h-auto"
              style={aspectRatioStyle}
            >
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={imageUrl[0]}
                    alt="Before"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={imageUrl[1]}
                    alt="After"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                }
                position={sliderPosition}
                onPositionChange={(position) => {
                  if (!isAnimating) {
                    setSliderPosition(position);
                  }
                }}
                className="w-full h-full"
                boundsPadding={0}
              />
            </div>
          </div>
        </div>
      );
    }

    // Legacy support for old types (backward compatibility)
    switch (type) {
      case "full-width":
        return (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={work?.title || "Work image"}
              className="w-full object-cover cursor-pointer"
              onClick={() => handleImageClick(imageUrl, 0, galleryIndex, type)}
            />
          </div>
        );
      case "2col-full":
        if (!Array.isArray(imageUrl) || imageUrl.length === 0) return null;
        return (
          <div className="grid grid-cols-2 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work?.title || "Work image"}
                className="w-full object-cover cursor-pointer"
                onClick={() => handleImageClick(url, index, galleryIndex, type)}
              />
            ))}
          </div>
        );
      case "compare-full":
        if (!Array.isArray(imageUrl) || imageUrl.length < 2) return null;
        return (
          <div className="w-full relative">
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
            <div className="mt-[-40px]">
              <div className="cursor-pointer">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={imageUrl[0]}
                      alt="Before"
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={imageUrl[1]}
                      alt="After"
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  }
                  position={sliderPosition}
                  onPositionChange={(position) => {
                    if (!isAnimating) {
                      setSliderPosition(position);
                    }
                  }}
                  className="w-full h-full"
                  boundsPadding={0}
                />
              </div>
            </div>
          </div>
        );
      case "2col-4:5":
        if (!Array.isArray(imageUrl) || imageUrl.length === 0) return null;
        return (
          <div className="grid grid-cols-2 gap-[10px]">
            {imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={work?.title || "Work image"}
                className="w-full object-cover cursor-pointer"
                onClick={() => handleImageClick(url, index, galleryIndex, type)}
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

    const currentImage = popupImage;

    // Check if there's a previous image in flattened array
    const hasPrev = popupFlatIndex !== null && popupFlatIndex > 0;
    
    // Check if there's a next image in flattened array
    const hasNext = popupFlatIndex !== null && popupFlatIndex < flattenedImages.length - 1;

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

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:opacity-70 transition-opacity z-10"
            >
              ‹
            </button>
          )}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:opacity-70 transition-opacity z-10"
            >
              ›
            </button>
          )}

          {/* Image counter */}
          {popupFlatIndex !== null && flattenedImages.length > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {popupFlatIndex + 1} / {flattenedImages.length}
            </div>
          )}

          {/* Main image */}
          <img
            src={currentImage}
            alt={work?.title || "Work image"}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  // Early returns for loading and error states
  if (isLoadingWork) {
    return (
      <div className={styles.workDetail}>
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-black text-lg">Loading work details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isWorkError || !work) {
    return (
      <div className={styles.workDetail}>
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="text-black text-lg mb-4">
                {workError?.message || "Work not found"}
              </div>
              <Link
                to="/works"
                className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Back to Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            backgroundImage: `url('${
              work.hero_banner_image || "/hero-banner-detailwork.jpg"
            }')`,
            backgroundSize: heroBannerFillMode,
            backgroundPosition: `${work.hero_banner_position_x || 'center'} ${work.hero_banner_position_y || 'top'}`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="w-full px-5">
          <div className="flex gap-2">
            <div className="font-semibold text-white bg-black px-2 py-1 rounded-[4px]">
              #
            </div>
            {work.tags &&
              Array.isArray(work.tags) &&
              work.tags.map((item, index) => (
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
                  {work.client || "N/A"}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px] ">TITLE</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium">
                  {work.title || "N/A"}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[60px] mr-[24px] ">CATEGORY</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium capitalize">
                  {work.category || "N/A"}
                </div>
              </div>
            </FadeInSection>
            {work.description && (
              <FadeInSection delay={0.3}>
                <div className="w-full flex border-b border-black py-2 lg:py-5">
                  <div className="w-[68px] lg:mr-[60px] mr-[24px] ">DESC.</div>
                  <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] text-justify font-medium">
                    {work.description || "No description available"}
                  </div>
                </div>
              </FadeInSection>
            )}
            <FadeInSection delay={0.3}>
              <div className="w-full flex pt-2 lg:pt-5 ">
                <div className="w-[68px] lg:mr-[60px] mr-[24px]">CREDITS</div>
                <div className="w-full  font-medium">
                  {work.credits && work.credits.length > 0 ? (
                    work.credits.map((creditsItem, index) => (
                      <div
                        key={index}
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
                            {/* Handle corrected API structure: names (array) */}
                            {creditsItem.names &&
                            Array.isArray(creditsItem.names) &&
                            creditsItem.names.length > 0 ? (
                              creditsItem.names.map((item, nameIndex) => (
                                <div key={nameIndex}>{item}</div>
                              ))
                            ) : (
                              <div className="text-gray-500">Not specified</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] text-gray-500">
                      No credits available
                    </div>
                  )}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="w-full flex border-b border-black py-2 lg:py-5">
                <div className="w-[68px] lg:mr-[52px] mr-[24px] ">©</div>
                <div className="lg:w-[calc(50%-120px)] w-[calc(100%-76px)] font-medium">
                  {work.year || "N/A"}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
        <FadeInSection delay={0.3}>
          {/* Video Player Tabs */}
          {(work.video_project_src ? 1 : 0) +
            (work.video_vimeo_url ? 1 : 0) +
            (work.video_youtube_url ? 1 : 0) +
            (work.video_cloudflare_url ? 1 : 0) >
            1 && (
            <div className="flex w-full bg-black">
              {work.video_project_src && (
                <button
                  onClick={() => setActiveVideoTab("uploaded")}
                  className={`px-3 py-1 text-xs font-medium ${
                    activeVideoTab === "uploaded"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  Optimized
                </button>
              )}
              {work.video_vimeo_url && (
                <button
                  onClick={() => setActiveVideoTab("vimeo")}
                  className={`px-3 py-1 text-xs font-medium ${
                    activeVideoTab === "vimeo"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  Vimeo
                </button>
              )}
              {work.video_youtube_url && (
                <button
                  onClick={() => setActiveVideoTab("youtube")}
                  className={`px-3 py-1 text-xs font-medium ${
                    activeVideoTab === "youtube"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  YouTube
                </button>
              )}
              {work.video_cloudflare_url && (
                <button
                  onClick={() => setActiveVideoTab("cloudflare")}
                  className={`px-3 py-1 text-xs font-medium ${
                    activeVideoTab === "cloudflare"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  Cloudflare
                </button>
              )}
            </div>
          )}
          <div id="Video-Project-Player" className="lg:mb-[10px] mb-[10px]">
            <div
              className="relative w-full bg-black"
              style={{
                paddingBottom:
                  deviceType === "desktop"
                    ? "calc(56.25% - 62px)"
                    : "calc(86.25% - 62px)",
              }}
            >
              {/* Video Player Content */}
              {activeVideoTab === "uploaded" && work.video_project_src ? (
                <>
                  {/* Custom Poster Overlay */}
                  {!hasVideoStarted && work.video_project_poster && (
                    <>
                      <img
                        src={work.video_project_poster}
                        alt="Video poster"
                        className="absolute top-0 left-0 w-full h-full object-cover z-20"
                      />
                      
                      {/* Overlay content */}
                      <div className="absolute inset-0 z-30">
                        {/* Title on top left */}
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                          <h2 className="text-white text-lg lg:text-2xl font-bold drop-shadow-lg">
                            {work.title}
                          </h2>
                        </div>
                        
                        {/* Play button in center */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const video = e.target.closest('.relative').querySelector('video');
                            if (video) {
                              video.play();
                            }
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-all duration-300 hover:scale-110"
                          aria-label="Play video"
                        >
                          {/* Play icon SVG */}
                          <svg 
                            className="w-10 h-10 lg:w-12 lg:h-12 text-white ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                  
                  <video
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={work.video_project_src}
                    controls
                    controlsList="nodownload noplaybackrate"
                    playsInline
                    preload="metadata"
                    style={{ borderRadius: "0px" }}
                    onError={(e) => {
                      console.log("Video Project video failed to load:", e);
                    }}
                    onLoadedData={() => {
                      console.log("Video Project video loaded successfully");
                    }}
                    onPlay={(e) => {
                      setIsVideoPlaying(true);
                      setHasVideoStarted(true); // Mark that video has been played
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
                    onPause={() => {
                      setIsVideoPlaying(false);
                    }}
                    onEnded={() => {
                      setIsVideoPlaying(false);
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : activeVideoTab === "vimeo" && work.video_vimeo_url ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={work.video_vimeo_url}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; accelerometer; encrypted-media; gyroscope"
                  allowFullScreen
                  title="Vimeo Video"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              ) : activeVideoTab === "youtube" && work.video_youtube_url ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={work.video_youtube_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              ) : activeVideoTab === "cloudflare" &&
                work.video_cloudflare_url ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={work.video_cloudflare_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Cloudflare Stream Video"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                  <div className="text-center">
                    <div className="text-lg mb-2">No video available</div>
                    <div className="text-sm opacity-70">
                      This work doesn't have a video project attached
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>
        {/* Project Details */}
        <div className="w-full mx-auto lg:px-[10px]">
          {work.gallery_items && work.gallery_items.length > 0 ? (
            work.gallery_items.map((item, index) => (
              <div key={item.id} className="mb-[10px]">
                <FadeInSection delay={0.3}>
                  {item.images &&
                    item.images.length > 0 &&
                    renderImage(item.type, item.images, index)}
                </FadeInSection>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">No project images available</div>
            </div>
          )}
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
            {relatedWorksData && relatedWorksData.length > 0 ? (
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
                {relatedWorksData.map((workItem, index) => (
                  <SwiperSlide key={`second-row-${index}`}>
                    <Link
                      to={`/works/${workItem.id}/${workItem.slug}`}
                      className="workItem block"
                    >
                      <div className="overflow-hidden">
                        <div className="overflow-hidden relative bg-black aspect-video" id={`workImage${index}`}>
                          <img
                            src={workItem.hero_banner_image}
                            alt={workItem.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[107%]"
                          />
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
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-black">No related works found</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add this popup component at the end of your return statement, before the closing </div> */}
      <ImagePopup />
    </div>
  );
};

export default WorkDetail;
