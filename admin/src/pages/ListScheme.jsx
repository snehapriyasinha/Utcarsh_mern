import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ListSchemes = ({ token }) => {
  const [schemeList, setSchemeList] = useState([]);

  const fetchSchemeList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/scheme/list");
      setSchemeList(response.data.schemes);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteScheme = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/scheme/delete",
        { id },
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSchemeList();
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchSchemeList();
  }, []);

  return (
    <>
      <p className="mb-2">Schemes List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Location</b>
          <b>State</b>
          <b>Action</b>
        </div>

        <div>
          {schemeList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img src={item.image} className="w-12" alt="scheme" />
              <p>{item.name}</p>
              <p>{item.city}</p>
              <p>{item.state}</p>
              <p
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => deleteScheme(item._id)}
              >
                <b>X</b>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListSchemes;
