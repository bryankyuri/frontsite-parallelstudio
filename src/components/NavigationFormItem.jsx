import React from "react";

const NavigationFormItemWrapper = ({ children, onClick, isDesktop }) => {
  return (
    <>
      {isDesktop ? (
        <div className="relative border border-white lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] overflow-hidden group cursor-pointer">
          {children}
        </div>
      ) : (
        <button
          onClick={onClick}
          className="relative border border-white lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] overflow-hidden group cursor-pointer"
        >
          {children}
        </button>
      )}
    </>
  );
};

const NavigationFormItem = ({
  title,
  description,
  buttonText,
  onClick,
  isDesktop,
}) => {
  return (
    <NavigationFormItemWrapper onClick={onClick} isDesktop={isDesktop}>
      <div className="flex justify-center items-center h-full w-full text-[32px] font-bold transition-opacity duration-300 group-hover:opacity-0">
        {title}
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white text-black flex flex-col justify-center items-center p-8 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <h3 className="text-[16px] font-bold mb-4 text-center">{title}</h3>
        <p className="text-[14px] text-gray-600 mb-6 text-center leading-relaxed">
          {description}
        </p>
        <button
          onClick={onClick}
          className="bg-black text-white px-6 py-3 text-[12px] font-semibold hover:bg-gray-800 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </NavigationFormItemWrapper>
  );
};

export default NavigationFormItem;
