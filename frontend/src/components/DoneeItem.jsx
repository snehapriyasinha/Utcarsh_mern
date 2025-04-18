import React from "react";
import { Link } from "react-router-dom";

const DoneeItem = ({ id, name, category, city, state, image }) => {
  return (
    <Link
      className="text-gray-700 cursor-pointer h-full flex flex-col bg-white shadow-md rounded-lg p-4"
      to={`/RecipientInfo/${id}`}
    >
      {/* Image Container */}
      <div className="overflow-hidden h-40">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-full object-cover rounded-md"
          src={
            Array.isArray(image) && image.length > 0
              ? image[0]
              : "fallback-image-url"
          }
          alt={name}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-between mt-3">
        <div>
          <p className="pb-1 text-sm font-medium">{name}</p>
          <p className="text-sm">{category}</p>
          <p className="text-sm">
            {city}, {state}
          </p>
          
        </div>
      </div>
    </Link>
  );
};

export default DoneeItem;
