import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SchemeContext } from "../context/SchemesContext";
import PageTitle from "../components/PageTitle";

const Schemes = () => {
  const { schemes } = useContext(SchemeContext);
  const navigate = useNavigate();

  return (
    <div className="border-t pt-10 bg-gray-50 min-h-screen">
      <div className="text-2xl">
        <PageTitle txt1={"Online Donation"} txt2={"Schemes"} />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        {schemes.map((scheme, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-5 flex flex-col md:flex-row md:items-center gap-6 border"
          >
            {/* Image & Info */}
            <div className="flex items-start gap-5 flex-1">
              <img
                src={scheme.image}
                alt={scheme.name}
                className="w-28 h-28 object-cover rounded-md border"
              />

              <div className="space-y-2 text-sm md:text-base text-gray-700">
                <p className="text-xl font-semibold text-gray-800">
                  {scheme.name}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {scheme.description}
                </p>
                <div className="text-sm text-gray-500 pt-2">
                  <p>{scheme.address}</p>
                  <p>
                    {scheme.city && `${scheme.city}, `}
                    {scheme.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <div className="flex justify-end md:justify-center items-center">
              <button
                onClick={() => navigate(`/DonationDetails/${scheme._id}`)}
                className="px-5 py-2 bg-black text-white rounded-md font-medium text-sm hover:bg-gray-800 transition duration-150"
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
