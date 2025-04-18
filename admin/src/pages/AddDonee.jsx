import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const AddDonee = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("NGO");
  const [accept, setAccept] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [add, setAdd] = useState("India");
  const [phone, setPhone] = useState("8580298085");
  const [loc, setLoc] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("category", cat);
      formData.append("accepts", JSON.stringify(accept));
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", add);
      formData.append("phone", phone);
      formData.append("location", loc);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/donee/add",
        formData,
        { headers: { token } }
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDesc("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setAdd("");
        setAccept([]);
        setCat("NGO");
        setCity("");
        setState("Andhra Pradesh");
        setLoc("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding donee:", toast.error(error.message));
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            ></input>
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            ></input>
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            ></input>
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            ></input>
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Recipient Name</p>
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
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        ></textarea>
      </div>
      <div className="w-1/2">
        <div className="mt-4">
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCat(e.target.value)}
            value={cat}
            className="w-full px-3 py-2"
          >
            <option value="NGO">NGO</option>
            <option value="Village">Village</option>
            <option value="Slum">Slum</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        <div className="mt-4">
          <p className="mb-2">Accepts</p>
          <select
            onChange={(e) =>
              setAccept(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={accept}
            className="w-full px-3 py-2"
            multiple
          >
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
            <option value="Money">Money</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mt-4">
          <p className="mb-2">State</p>
          <select
            onChange={(e) => setState(e.target.value)}
            value={state}
            className="w-full px-3 py-2"
          >
            <option value="Andhra Pradesh" selected>
              Andhra Pradesh
            </option>
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
      </div>
      <div className="w-full">
        <p className="mb-2">City</p>
        <input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        ></input>
      </div>
      <div className="w-full">
        <p className="mb-2">Address</p>
        <input
          onChange={(e) => setAdd(e.target.value)}
          value={add}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
        ></input>
      </div>
      <div className="w-full">
        <p className="mb-2">Phone (Default: Utcarsh Phone, enter to change)</p>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className="w-full max-w-[500px] px-3 py-2"
          type="tel"
          placeholder="+91"
        ></input>
      </div>
      <div className="w-full">
        <p className="mb-2">Location link</p>
        <textarea
          onChange={(e) => setLoc(e.target.value)}
          value={loc}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        ></textarea>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default AddDonee;
