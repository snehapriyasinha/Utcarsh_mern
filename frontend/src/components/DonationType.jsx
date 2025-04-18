import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const DonationType = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row border border-gray-400 ">
        <img className="w-full sm:w-1/2" src={assets.d1} alt=""></img>
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 cursor-pointer">
          <div className="text-[#414141]">
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Donate Money to Utcarsh Foundation.
            </h1>
            <NavLink to="/Schemes" className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">
                Click to here to pay
              </p>
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row border border-gray-400">
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 cursor-pointer">
          <div className="text-[#414141]">
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Donate goods to NGOs, Villages, slums and others.
            </h1>

            <NavLink to="/Recipients" className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">
                Click to here to see details
              </p>
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            </NavLink>
          </div>
        </div>
        <img className="w-full sm:w-1/2" src={assets.d2} alt=""></img>
      </div>
    </>
  );
};

export default DonationType;
