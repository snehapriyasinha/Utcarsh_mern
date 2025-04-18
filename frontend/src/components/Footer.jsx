import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt=""></img>
          <p>
            Utcarsh is a compassionate initiative designed to bridge the gap
            between generosity and impact. Our platform enables donors to
            contribute towards verified welfare schemes tailored for rural
            development, healthcare, education, and sustainability.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">FOUNDATION</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Love</li>
            <li>CARE</li>
            <li>Support</li>
            <li>Impact</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 8529805808</li>
            <li>utcarsh@help.in</li>
          </ul>
        </div>
      </div>
      <div>
        <hr></hr>
        <p className="py-5 text-sm text-center">
          &copy; utcarsh.in - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
