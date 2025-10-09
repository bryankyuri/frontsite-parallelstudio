import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import styles from "../styles/Contact.module.scss";
import { AppContext } from "../context/AppContext";
import { FadeInSection } from "../components/FadeInSection";
import NavigationFormItem from "../components/NavigationFormItem";
import TabNavigationForm from "../components/TabNavigationForm";

const Contact = () => {
  const { deviceType, vh } = useContext(AppContext);
  const [isShowForm, setIsShowForm] = useState(false);

  // Form states for each form type
  const [pitchForm, setPitchForm] = useState({
    name: "",
    email: "",
    portfolioLink: "",
    message: "",
    subject: null,
  });

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    documentLink: "",
    message: "",
  });

  const [produceForm, setProduceForm] = useState({
    name: "",
    email: "",
    companyName: "",
    message: "",
  });

  // Error states for each form type
  const [pitchErrors, setPitchErrors] = useState({});
  const [partnerErrors, setPartnerErrors] = useState({});
  const [produceErrors, setProduceErrors] = useState({});

  // Loading states for form submissions
  const [pitchLoading, setPitchLoading] = useState(false);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [produceLoading, setProduceLoading] = useState(false);

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const formParam = urlParams.get("form");

    if (formParam && ["pitch", "partner", "produce", "career"].includes(formParam)) {
      setIsShowForm(formParam);
    }
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url) => {
    if (!url) return true; // Optional field
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
  };

  const validatePitchForm = () => {
    const errors = {};

    if (!pitchForm.name.trim()) {
      errors.name = "Name is required";
    } else if (pitchForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!pitchForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(pitchForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!pitchForm.subject) {
      errors.subject = "Please select a subject";
    }

    if (pitchForm.portfolioLink && !validateURL(pitchForm.portfolioLink)) {
      errors.portfolioLink = "Please enter a valid URL";
    }

    if (!pitchForm.message.trim()) {
      errors.message = "Message is required";
    } else if (pitchForm.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const validatePartnerForm = () => {
    const errors = {};

    if (!partnerForm.name.trim()) {
      errors.name = "Name is required";
    } else if (partnerForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!partnerForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(partnerForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (partnerForm.documentLink && !validateURL(partnerForm.documentLink)) {
      errors.documentLink = "Please enter a valid URL";
    }

    if (!partnerForm.message.trim()) {
      errors.message = "Message is required";
    } else if (partnerForm.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const validateProduceForm = () => {
    const errors = {};

    if (!produceForm.name.trim()) {
      errors.name = "Name is required";
    } else if (produceForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!produceForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(produceForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!produceForm.companyName.trim()) {
      errors.companyName = "Company name is required";
    } else if (produceForm.companyName.trim().length < 2) {
      errors.companyName = "Company name must be at least 2 characters";
    }

    if (!produceForm.message.trim()) {
      errors.message = "Message is required";
    } else if (produceForm.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  // Handle form input changes
  const handlePitchFormChange = (field, value) => {
    setPitchForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (pitchErrors[field]) {
      setPitchErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePartnerFormChange = (field, value) => {
    setPartnerForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (partnerErrors[field]) {
      setPartnerErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProduceFormChange = (field, value) => {
    setProduceForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (produceErrors[field]) {
      setProduceErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submissions
  const handlePitchSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePitchForm();
    setPitchErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Pitch form validation failed:", errors);
      return;
    }

    setPitchLoading(true);

    try {
      console.log("Pitch form submitted:", pitchForm);
      // Add your form submission logic here
      // await submitPitchForm(pitchForm);

      // Reset form on success
      setPitchForm({
        name: "",
        email: "",
        portfolioLink: "",
        message: "",
        subject: null,
      });

      alert("Pitch form submitted successfully!");
    } catch (error) {
      console.error("Error submitting pitch form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setPitchLoading(false);
    }
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePartnerForm();
    setPartnerErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Partner form validation failed:", errors);
      return;
    }

    setPartnerLoading(true);

    try {
      console.log("Partner form submitted:", partnerForm);
      // Add your form submission logic here
      // await submitPartnerForm(partnerForm);

      // Reset form on success
      setPartnerForm({
        name: "",
        email: "",
        documentLink: "",
        message: "",
      });

      alert("Partner form submitted successfully!");
    } catch (error) {
      console.error("Error submitting partner form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setPartnerLoading(false);
    }
  };

  const handleProduceSubmit = async (e) => {
    e.preventDefault();

    const errors = validateProduceForm();
    setProduceErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Produce form validation failed:", errors);
      return;
    }

    setProduceLoading(true);

    try {
      console.log("Produce form submitted:", produceForm);
      // Add your form submission logic here
      // await submitProduceForm(produceForm);

      // Reset form on success
      setProduceForm({
        name: "",
        email: "",
        companyName: "",
        message: "",
      });

      alert("Produce form submitted successfully!");
    } catch (error) {
      console.error("Error submitting produce form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setProduceLoading(false);
    }
  };

  const subjectOptions = [
    { value: "Producer", label: "PRODUCER" },
    { value: "Director", label: "DIRECTOR" },
    { value: "Editor", label: "EDITOR" },
    { value: "VFX Artist", label: "VFX ARTIST" },
    { value: "Sound Designer", label: "SOUND DESIGNER" },
    { value: "Cinematographer", label: "CINEMATOGRAPHER" },
    { value: "Scriptwriter", label: "SCRIPTWRITER" },
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#000000",
      border: "none",
      borderRadius: "0",
      minHeight: "32px",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
      cursor: "pointer",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#ffffff",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "500",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      border: "none",
      borderRadius: "0",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 9999,
      maxHeight: "350px",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      padding: "0",
      maxHeight: "350px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#000000"
        : state.isHovered
        ? "#000000"
        : "#fff",
      color: state.isSelected
        ? "#ffffff"
        : state.isHovered
        ? "#ffffff"
        : "#000",
      padding: "12px 16px",
      fontSize: "16px",
      fontWeight: "500",
      textAlign: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#ffffff",
      "&:hover": {
        color: "#ffffff",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

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
          className={`w-full bg-black text-white py-32 relative ${styles.heroBanner} flex flex-col lg:justify-center lg:items-center justify-start items-center mb-[140px] lg:mb-[140px]`}
          style={{
            height: deviceType === "desktop" ? "1018px" : "auto",
            backgroundImage: `url('/hero-banner-contact.jpg')`,
            backgroundSize:
              deviceType === "desktop" ? "auto 100%" : "auto 100%",
            backgroundPosition:
              deviceType === "desktop" ? `right 0px` : "90% 0px",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#0a0408",
          }}
        >
          {isShowForm ? (
            <>
              <TabNavigationForm
                activeForm={isShowForm}
                onFormChange={setIsShowForm}
                isDesktop={deviceType === "desktop"}
              />
              <div
                className="lg:w-[920px] w-[calc(100vw-20px)] mx-auto lg:p-[40px] px-[10px] py-[20px]  bg-white text-black animate-slideUp"
                id="form-container"
              >
                {isShowForm === "career" && (
                  <div className="w-full mx-auto animate-fadeIn">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-[16px] font-semibold mb-4">
                        SEND US YOUR PORTFOLIO AS
                      </h3>

                      {/* Subject Dropdown */}
                      <div className="relative mb-12 mx-auto max-w-[415px] h-[32px] flex items-center">
                        <Select
                          value={pitchForm.subject}
                          onChange={(selectedOption) =>
                            handlePitchFormChange("subject", selectedOption)
                          }
                          options={subjectOptions}
                          placeholder="SELECT SUBJECT"
                          styles={customSelectStyles}
                          isSearchable={false}
                          className="w-full"
                        />
                        {pitchErrors.subject && (
                          <div className="text-red-500 text-sm mt-1 text-center">
                            {pitchErrors.subject}
                          </div>
                        )}
                      </div>
                    </div>

                    <form
                      onSubmit={handlePitchSubmit}
                      className="space-y-[10px]"
                    >
                      {/* Name and Email Row */}
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[10px] lg:gap-y-0 gap-y-[10px]">
                        <div>
                          <input
                            type="text"
                            placeholder="NAME"
                            value={pitchForm.name}
                            onChange={(e) =>
                              handlePitchFormChange("name", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              pitchErrors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {pitchErrors.name && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {pitchErrors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="EMAIL"
                            value={pitchForm.email}
                            onChange={(e) =>
                              handlePitchFormChange("email", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              pitchErrors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {pitchErrors.email && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {pitchErrors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Portfolio Link */}
                      <div>
                        <input
                          type="url"
                          placeholder="PORTFOLIO LINK"
                          value={pitchForm.portfolioLink}
                          onChange={(e) =>
                            handlePitchFormChange(
                              "portfolioLink",
                              e.target.value
                            )
                          }
                          className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center placeholder:no-underline focus:outline-none ${
                            pitchErrors.portfolioLink
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          } ${
                            pitchForm.portfolioLink.length > 0
                              ? "text-blue-500 underline"
                              : ""
                          }`}
                        />
                        {pitchErrors.portfolioLink && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {pitchErrors.portfolioLink}
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          placeholder="MESSAGE"
                          rows="6"
                          value={pitchForm.message}
                          onChange={(e) =>
                            handlePitchFormChange("message", e.target.value)
                          }
                          className={`flex items-center w-full border px-4 py-3 text-[16px] placeholder-gray-500  resize-none focus:outline-none ${
                            pitchErrors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          } ${
                            pitchForm.message.length > 0
                              ? "h-[278px]"
                              : "pt-[120px] h-auto text-center"
                          }`}
                        />
                        {pitchErrors.message && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {pitchErrors.message}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="w-full flex justify-end">
                        <button
                          type="submit"
                          disabled={pitchLoading}
                          className="w-1/2 border-black border-[1px] bg-black text-white py-4 text-[14px] font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black disabled:text-white"
                        >
                          {pitchLoading ? "SUBMITTING..." : "SUBMIT"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {isShowForm === "pitch" && (
                  <div className="w-full mx-auto animate-fadeIn">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-[16px] font-semibold mb-4">
                        Co-Create With Us
                      </h3>

                      <div className="relative mb-12 mx-auto text-[#969696]">
                        Have a short film idea with a strong voice? Let’s
                        collaborate. We’re open to collaboration and
                        post-production support for unique, impactful projects.
                      </div>
                    </div>

                    <form
                      onSubmit={handlePartnerSubmit}
                      className="space-y-[10px]"
                    >
                      {/* Name and Email Row */}
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[10px] lg:gap-y-0 gap-y-[10px]">
                        <div>
                          <input
                            type="text"
                            placeholder="NAME"
                            value={partnerForm.name}
                            onChange={(e) =>
                              handlePartnerFormChange("name", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              partnerErrors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {partnerErrors.name && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {partnerErrors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="EMAIL"
                            value={partnerForm.email}
                            onChange={(e) =>
                              handlePartnerFormChange("email", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              partnerErrors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {partnerErrors.email && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {partnerErrors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Document Link */}
                      <div>
                        <input
                          type="url"
                          placeholder="DOCUMENT LINK"
                          value={partnerForm.documentLink}
                          onChange={(e) =>
                            handlePartnerFormChange(
                              "documentLink",
                              e.target.value
                            )
                          }
                          className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center placeholder:no-underline focus:outline-none ${
                            partnerErrors.documentLink
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          } ${
                            partnerForm.documentLink.length > 0
                              ? "text-blue-500 underline"
                              : ""
                          }`}
                        />
                        {partnerErrors.documentLink && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {partnerErrors.documentLink}
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          placeholder="MESSAGE"
                          rows="6"
                          value={partnerForm.message}
                          onChange={(e) =>
                            handlePartnerFormChange("message", e.target.value)
                          }
                          className={`flex items-center w-full border px-4 py-3 text-[16px] placeholder-gray-500 resize-none focus:outline-none ${
                            partnerErrors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          } ${
                            partnerForm.message.length > 0
                              ? "h-[278px]"
                              : "pt-[120px] h-auto text-center"
                          }`}
                        />
                        {partnerErrors.message && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {partnerErrors.message}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="w-full flex justify-end">
                        <button
                          type="submit"
                          disabled={partnerLoading}
                          className="w-1/2 border-black border-[1px] bg-black text-white py-4 text-[14px] font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {partnerLoading ? "SUBMITTING..." : "SUBMIT"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {isShowForm === "produce" && (
                  <div className="w-full mx-auto animate-fadeIn">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-[16px] font-semibold mb-4">
                        Book the Team
                      </h3>

                      <div className="relative mb-12 mx-auto text-[#969696]">
                        For brands, agencies, or production houses looking for
                        post-production partners—let’s make something remarkable
                        together.
                      </div>
                    </div>

                    <form
                      onSubmit={handleProduceSubmit}
                      className="space-y-[10px]"
                    >
                      {/* Name and Email Row */}
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[10px] lg:gap-y-0 gap-y-[10px]">
                        <div>
                          <input
                            type="text"
                            placeholder="NAME"
                            value={produceForm.name}
                            onChange={(e) =>
                              handleProduceFormChange("name", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              produceErrors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {produceErrors.name && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {produceErrors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="EMAIL"
                            value={produceForm.email}
                            onChange={(e) =>
                              handleProduceFormChange("email", e.target.value)
                            }
                            className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                              produceErrors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                          />
                          {produceErrors.email && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                              {produceErrors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Company Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="COMPANY NAME"
                          value={produceForm.companyName}
                          onChange={(e) =>
                            handleProduceFormChange(
                              "companyName",
                              e.target.value
                            )
                          }
                          className={`w-full border px-4 py-3 text-[16px] placeholder-gray-500 text-center placeholder:text-center focus:outline-none ${
                            produceErrors.companyName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          }`}
                        />
                        {produceErrors.companyName && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {produceErrors.companyName}
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          placeholder="MESSAGE"
                          rows="6"
                          value={produceForm.message}
                          onChange={(e) =>
                            handleProduceFormChange("message", e.target.value)
                          }
                          className={`flex items-center w-full border px-4 py-3 text-[16px] placeholder-gray-500 resize-none focus:outline-none ${
                            produceErrors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-black"
                          } ${
                            produceForm.message.length > 0
                              ? "h-[278px]"
                              : "pt-[120px] h-auto text-center"
                          }`}
                        />
                        {produceErrors.message && (
                          <div className="text-red-500 text-xs mt-1 text-center">
                            {produceErrors.message}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="w-full flex justify-end">
                        <button
                          type="submit"
                          disabled={produceLoading}
                          className="w-1/2 border-black border-[1px] bg-black text-white py-4 text-[14px] font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {produceLoading ? "SUBMITTING..." : "SUBMIT"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </>
          ) : (
            <FadeInSection delay={0.3}>
              <div
                className="flex lg:flex-row flex-col gap-[10px]"
                id="navigation-form"
              >
                <NavigationFormItem
                  title="PITCH"
                  description="Have a short film idea with a strong voice? Let’s collaborate. We’re open to collaboration and post-production support for unique, impactful projects."
                  buttonText="CO-CREATE WITH US"
                  onClick={() => setIsShowForm("pitch")}
                />
                <NavigationFormItem
                  title="PRODUCE"
                  description="For brands, agencies, or production houses looking for post-production partners—let’s make something remarkable together."
                  buttonText="BOOK THE TEAM"
                  onClick={() => setIsShowForm("produce")}
                />
                <NavigationFormItem
                  title="CAREERS"
                  description="If you’re a colorist, editor, VFX artist, or post-production specialist looking to work on exciting projects, we’d love to connect."
                  buttonText="SEND US YOUR PORTFOLIO"
                  onClick={() => setIsShowForm("career")}
                />
              </div>
            </FadeInSection>
          )}
        </div>
      </FadeInSection>
    </div>
  );
};

export default Contact;
