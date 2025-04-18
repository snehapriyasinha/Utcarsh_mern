import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const AddScheme = ({ token }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [city, setCity] = useState("All Cities");
  const [address, setAddress] = useState("India");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("date", Date.now());
      image && formData.append("image", image);

      const response = await axios.post(
        backendUrl + "/api/scheme/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage(false);
        setState("Andhra Pradesh");
        setCity("");
        setAddress("India");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding scheme:", toast.error(error.message));
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image">
          <img
            className="w-20"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          ></input>
        </label>
      </div>
      <div className="w-full">
        <p className="mb-2">Scheme Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        ></input>
      </div>
      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          required
        ></textarea>
      </div>
      <div className="w-1/2">
        <p className="mb-2">State</p>
        <select
          onChange={(e) => setState(e.target.value)}
          value={state}
          className="w-full px-3 py-2"
        >
          <option value="Andhra Pradesh">All States</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>
      <div className="w-full">
        <p className="mb-2">City</p>
        <input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
        ></input>
      </div>
      <div className="w-full">
        <p className="mb-2">Address</p>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        ></input>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default AddScheme;
