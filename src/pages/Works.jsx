import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../components/FadeInSection";
import styles from "../styles/Works.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AppContext } from "../context/AppContext";
import { useWorksList } from "../hooks/useWorksList";

const Works = () => {
  const [activeFilters, setActiveFilters] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const { deviceType } = useContext(AppContext);

  // Build API filters
  const apiFilters = {
    sort_by: "published_at",
    sort_direction: "desc",
    per_page: 50, // Get more items for filtering
  };

  // Add category filter if selected
  if (selectedCategory) {
    apiFilters.category = selectedCategory;
  }

  // Add tags filter
  if (selectedTags.length > 0) {
    apiFilters.tags = selectedTags.map((tag) => tag.toUpperCase());
  }

  // Fetch works using the API
  const {
    data: worksResponse,
    isLoading,
    error,
    isError,
  } = useWorksList(apiFilters);

  const works = worksResponse?.data || [];

  // Extract typeTags and tags from API response
  const typeCategory = ["film/series", "commercial"]; // These are typeTags
  const typeTags = ["all", "motion graphic", "color grading", "cgi", "vfx"]; // These are tags
  // Handle filter toggle for type (typeTags: film/series, commercial)
  const handleTypeToggle = (category) => {
    if (selectedCategory === category) {
      // If clicking the same category, deselect it
      setSelectedCategory(null);
      // Keep the selected tags, just remove the category from activeFilters
      if (selectedTags.length > 0) {
        setActiveFilters(selectedTags);
      } else {
        setActiveFilters(["all"]);
      }
    } else {
      // Select the new category and preserve existing tags
      setSelectedCategory(category);
    }
  };

  // Handle filter toggle for tags (CGI, VFX, etc.)
  const handleFilterToggle = (tag) => {
    if (tag === "all") {
      // If "all" is clicked, clear all filters
      setActiveFilters(["all"]);
      setSelectedTags([]);
      setSelectedCategory(null);
    } else {
      setActiveFilters((prevFilters) => {
        // Remove "all" if it exists when selecting specific tags
        const withoutAll = prevFilters.filter((filter) => filter !== "all");

        if (selectedTags.includes(tag)) {
          // Remove the tag if it's already selected
          const newTags = selectedTags.filter((t) => t !== tag);
          setSelectedTags(newTags);

          // Combine category with remaining tags
          const newFilters = [];
          if (selectedCategory) newFilters.push(selectedCategory);
          newFilters.push(...newTags);

          // If no filters left, default to "all"
          return newFilters.length === 0 ? ["all"] : newFilters;
        } else {
          // Add the tag
          const newTags = [...selectedTags, tag];
          setSelectedTags(newTags);

          // Combine category with new tags
          const newFilters = [];
          if (selectedCategory) newFilters.push(selectedCategory);
          newFilters.push(...newTags);

          return newFilters;
        }
      });
    }
  };

  // Client-side filtering (for UI responsiveness while API filters work)
  const filteredWorks = works.filter((work) => {
    if (activeFilters.includes("all")) {
      return true;
    }

    // If a category is selected, filter by category
    if (selectedCategory) {
      if (work.category !== selectedCategory) {
        return false;
      }
    }

    // If tags are selected, filter by tags
    if (selectedTags.length > 0) {
      return (
        work.tags &&
        work.tags.some((tag) =>
          selectedTags.some(
            (selectedTag) => selectedTag.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    return true;
  });

  return (
    <div className={styles.works}>
      <div className="w-full mx-auto px-[10px] py-16">
        <FadeInSection>
          <h1 className="lg:text-[40px] text-[36px] text-black font-bold lg:mb-[80px] text-center">
            WORKS
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.1} id="type-categories-filters">
          {deviceType === "desktop" ? (
            <div className="flex justify-center mt-[117px] space-x-4 ">
              {typeCategory.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-bold transition-all duration-200 w-[300px] h-[72px] gap-x-[20px] mb-[10px] ${
                    selectedCategory === category
                      ? "bg-white border-black border text-black"
                      : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                  }`}
                  onClick={() => handleTypeToggle(category)}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-[117px] gap-[10px] ">
              {typeCategory.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-bold transition-all duration-200 w-full ${
                    selectedCategory === category
                      ? "bg-white border border-black text-black"
                      : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                  }`}
                  onClick={() => handleTypeToggle(category)}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </FadeInSection>

        <FadeInSection delay={0.1} id="type-categories-filters">
          <div className="flex justify-center lg:mb-[151px] mb-[117px] space-x-2">
            {deviceType === "desktop" ? (
              <>
                {typeTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-2 pt-[4px] pb-[3px] rounded-[6px] transition-all duration-200 text-[12px] ${
                      activeFilters.includes(tag)
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                    }`}
                    onClick={() => handleFilterToggle(tag)}
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
              </>
            ) : (
              <div className="w-full">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  className="typeTags-swiper"
                >
                  {typeTags.map((tag, index) => (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <button
                        className={`px-4 py-2 rounded whitespace-nowrap transition-all duration-200 ${
                          activeFilters.includes(tag)
                            ? "bg-black text-white"
                            : "bg-[#F0F0F0] text-[#787878] hover:bg-gray-300"
                        }`}
                        onClick={() => handleFilterToggle(tag)}
                      >
                        {tag.toUpperCase()}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-black text-lg">Loading works...</div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-center items-center py-16">
            <div className="text-red-500 text-lg">
              Error loading works: {error?.message || "Something went wrong"}
            </div>
          </div>
        )}

        {/* Works Grid */}
        {!isLoading && !isError && (
          <>
            {filteredWorks.length > 0 ? (
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
                      <Link to={`/works/${work.id}/${work.slug}`} className="workItem">
                        <div className="overflow-hidden">
                          <div className="overflow-hidden relative bg-black aspect-[16/9]" id={`workItem${index}`}>
                            <img
                              src={work.hero_banner_image}
                              alt={work.title}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[107%]"
                            />
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
            ) : (
              /* Empty State */
              <div className="flex flex-col justify-center items-center py-16 lg:py-24">
                <div className="text-center max-w-md">
                  <div className="text-black text-xl lg:text-2xl font-medium mb-4">
                    No projects found
                  </div>
                  <div className="text-gray-600 text-base lg:text-lg leading-relaxed">
                    No projects match your current filter combination. Try adjusting your filters or{" "}
                    <button
                      onClick={() => {
                        setActiveFilters(["all"]);
                        setSelectedTags([]);
                        setSelectedCategory(null);
                      }}
                      className="text-black font-medium underline hover:no-underline transition-all"
                    >
                      view all projects
                    </button>
                    .
                  </div>
                </div>
              </div>
            )}
          </>
        )}

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
