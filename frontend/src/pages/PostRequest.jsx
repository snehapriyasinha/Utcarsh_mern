import React, { useContext } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { SchemeContext } from "../context/SchemesContext";

const PostRequest = () => {
  const { token } = useContext(SchemeContext);
  const onSubmitHandler = (e) => {
    //send email
    //emailjs.send("service_7uqfzxw","template_26slift");
    e.preventDefault();
    if (!token) {
      toast.error("Please log in to send a request.");
      return;
    }
    emailjs
      .sendForm(
        "service_7uqfzxw", // Your Service ID
        "template_26slift", // Your Template ID
        e.target, // Form reference
        "-2dDOoLJAeFAmFkMI" // Your Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email sent successfully!");
          e.target.reset(); // Reset form fields
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email.");
        }
      );
  };

  return (
    <form
      name="post_form"
      onSubmit={onSubmitHandler}
      className="w-full max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 font-semibold">Your Name</p>
            <input
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="text"
              required
            />
          </div>
          <div>
            <p className="mb-2 font-semibold">Phone</p>
            <input
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="tel"
              placeholder="+91"
              required
            />
          </div>
          <div>
            <p className="mb-2 font-semibold">Requirement</p>
            <input
              name="requirement"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder=""
              required
            />
          </div>

          <div>
            <p className="mb-2 font-semibold">About You</p>
            <textarea
              name="aboutYou"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={2}
              required
            ></textarea>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 font-semibold">State</p>
            <select
              name="state"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              defaultValue="Andhra Pradesh"
            >
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

          <div>
            <p className="mb-2 font-semibold">City</p>
            <input
              name="city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="text"
              required
            />
          </div>

          <div>
            <p className="mb-2 font-semibold">Address</p>
            <input
              name="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="text"
              required
            />
          </div>

          <div>
            <p className="mb-2 font-semibold">Location link</p>
            <textarea
              name="loc"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={2}
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all"
        >
          SEND REQUEST
        </button>
      </div>
    </form>
  );
};

export default PostRequest;
