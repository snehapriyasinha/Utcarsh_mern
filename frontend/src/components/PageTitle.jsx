import React from "react";

const PageTitle = ({ txt1, txt2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 gap-2">
        {txt1}&nbsp;
        <span className="text-gray-700 font-medium">{txt2} </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default PageTitle;
