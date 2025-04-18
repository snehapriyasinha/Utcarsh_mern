import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DoneesContext } from "../context/DoneesContext";

const RecipientInfo = () => {
  const { doneeId } = useParams();
  // console.log(doneeId);

  const { donees } = useContext(DoneesContext);
  const [doneeData, setDoneeData] = useState(false);
  const [image, setImage] = useState("");

  const fetchDoneeData = async () => {
    donees.map((item) => {
      if (item._id == doneeId) {
        setDoneeData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchDoneeData();
  }, [doneeId]);

  return doneeData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*Donee image*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {doneeData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[18%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              ></img>
            ))}
          </div>
          <div className="w-full sm:w-[60%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/** Donee info */}
        <div className="flex-1">
          <h1 className="font-medium text-3xl mt-2">{doneeData.name}</h1>
          <p className="mt-1">
            {doneeData.address}, {doneeData.city}, {doneeData.state}
          </p>
          <p className="text-sm">{doneeData.phone}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{doneeData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Accepts</p>
            <div>
              {doneeData.accepts.map((item, index) => (
                <span
                  className="border rounded mr-2 py-1 px-2 bg-gray-100"
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <button
            className="border rounded bg-black  text-white font-medium px-4 py-2 mt-0 active:bg-[#b2b2f0] active:text-black"
            onClick={() => window.open(doneeData.location, "_blank")}
          >
            OPEN MAP
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default RecipientInfo;
