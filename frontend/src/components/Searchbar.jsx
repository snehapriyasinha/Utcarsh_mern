import React from "react";
import { useContext } from "react";
import { DoneesContext } from "../context/DoneesContext";
import { assets } from "../assets/assets";

const Searchbar = () => {
  const { search, setSearch } = useContext(DoneesContext);
  return (
    <div className="bg-gray-50 p-4">
      <div className="text-center">
        <div className="inline-flex items-center border border-gray-400 rounded-full bg-white px-4 py-2 gap-2 w-[400px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-inherit text-sm"
            placeholder="Search by location or donation type or donee name"
            type="text"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.search_icon}
            alt="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
