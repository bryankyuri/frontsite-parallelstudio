import React, { useContext, useState } from "react";
import styles from "../styles/Contact.module.scss";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const { deviceType, vh } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className={styles.contact}>
      <div className="w-full lg:text-center px-5 py-20 leading-[120%] text-black font-bold lg:text-[40px] text-[36px] uppercase">
        {deviceType === "desktop" ? (
          <>Collaborate? Or maybe join our team of artists</>
        ) : (
          <>
            Collaborate?
            <br /> Or maybe join
            <br /> our team of
            <br /> artists
          </>
        )}
      </div>
      <div
        className={`w-full bg-black text-white py-32 relative ${styles.heroBanner} flex lg:justify-center lg:items-center justify-start items-end mb-[140px] lg:mb-[420px]`}
        style={{
          height:
            deviceType === "desktop"
              ? "calc(100vh - 62px)"
              : "calc(100vh - 66px)",
          backgroundImage: `url('/hero-banner-contact.jpg')`,
          backgroundSize: deviceType === "desktop" ? "100% auto" : "auto 100%",
          backgroundPosition:
            deviceType === "desktop" ? `center 0px` : "90% 0px",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className=" w-full px-5 mb-[148px] lg:mb-0">
        <div className="lg:w-1/2 w-full">
          <div className="lg:text-[24px] text-[16px] font-semibold text-black mb-10">
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
      </div>
      {/* <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              Have a question or want to work together? Fill out the form and we'll
              get back to you as soon as possible.
            </p>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-700">info@yourcompany.com</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-700">+1 (123) 456-7890</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Address</h3>
              <p className="text-gray-700">
                123 Main Street<br />
                City, State 12345<br />
                Country
              </p>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;
