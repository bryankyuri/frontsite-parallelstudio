import React from 'react';

const TabNavigationForm = ({ 
  activeForm, 
  onFormChange 
}) => {
  const tabs = [
    { id: 'pitch', label: 'PITCH.' },
    { id: 'produce', label: 'PRODUCE.' },
    { id: 'career', label: 'CAREERS' }
  ];

  return (
    <div className="flex w-full lg:w-auto px-[10px] items-center gap-x-[10px] outline-none text-[14px] lg:text-[16px] mb-[20px] animate-fadeIn" id="tab-navigation-form">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`border border-white lg:w-[300px] w-full lg:px-auto lg:h-[72px] h-[60px] transition-all duration-300 ${
            activeForm === tab.id ? "bg-white text-black" : ""
          }`}
          onClick={() => onFormChange(tab.id)}
        >
          <div className="flex justify-center items-center h-full w-full text-[16px] font-bold">
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TabNavigationForm;
