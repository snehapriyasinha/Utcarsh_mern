import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-4 pl-[15%]">
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l"
          to="/addDonee"
        >
          <img className="w-5 h-5" src={assets.add_icon} />
          <p className="hidden md:block">Add Donee</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l"
          to="/addScheme"
        >
          <img className="w-5 h-5" src={assets.add_icon} />
          <p className="hidden md:block">Add Scheme</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l"
          to="/listDonee"
        >
          <img className="w-5 h-5" src={assets.order_icon} />
          <p className="hidden md:block">List Donee</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l"
          to="/listScheme"
        >
          <img className="w-5 h-5" src={assets.order_icon} />
          <p className="hidden md:block">List Scheme</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l"
          to="/listDonation"
        >
          <img className="w-5 h-5" src={assets.order_icon} />
          <p className="hidden md:block">List Donation</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
