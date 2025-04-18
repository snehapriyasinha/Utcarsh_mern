import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ListDonee = ({ token }) => {
  const [doneeList, setDoneeList] = useState([]);

  const fetchDoneeList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/donee/list");
      setDoneeList(response.data.donees);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteDonee = async (id) => {
    console.log("Deleting Donee with ID:", id); // Debugging
    try {
      const response = await axios.post(
        backendUrl + "/api/donee/delete",
        { id },
        { headers: { token } }
      );
      console.log(response.data); // Debugging
      if (response.data.success) {
        toast.success(response.data.message);
        fetchDoneeList();
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDoneeList();
  }, []); // Runs only once

  return (
    <>
      <p className="mb-2">Recipients List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>State</b>
          <b>City</b>
          <b>Action</b>
        </div>

        <div>
          {doneeList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img src={item.image[0]} className="w-12" alt="donee" />
              <p className="truncate">{item.name}</p>
              <p>{item.category}</p>
              <p>{item.state}</p>
              <p>{item.city}</p>
              <p
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => deleteDonee(item._id)}
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

export default ListDonee;
