import React from "react";
import { assets } from "../assets/assets";

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Fast Money Transfer</p>
        <p className="text-gray-400">
          We ensure your money reach the needy as quicky as possible
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Verified Beneficiary</p>
        <p className="text-gray-400">
          We ensure you only see request posts from actual needies and no
          scammers
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Foundation Support</p>
        <p className="text-gray-400">
          We are available for any kind of queries regarding donation,
          beneficiaries, etc
        </p>
      </div>
    </div>
  );
};

export default Policy;
