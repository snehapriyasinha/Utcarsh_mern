import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SchemeContext } from "../context/SchemesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DonationDetails = () => {
  const GST = 1.18;
  const { schemeId } = useParams();
  const { backendUrl, token, schemes } = useContext(SchemeContext);
  const navigate = useNavigate();
  const scheme = schemes.find((s) => s._id === schemeId);

  const [formdata, setFormData] = useState({
    name: "",
    phone: "",
    netPayment: "",
  });

  const formatPhone = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 10); // Limit to 10 digits
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((data) => ({ ...data, [name]: formatPhone(value) }));
    } else {
      setFormData((data) => ({ ...data, [name]: value }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formdata.netPayment);

    if (!formdata.name || !formdata.phone || !formdata.netPayment) {
      toast.error("Please fill all fields.");
      return;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }

    if (formdata.phone.length < 10) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      const grossAmount = parseFloat((amount * GST).toFixed(2));
      let donationObj = {
        donor: formdata,
        grossPayment: grossAmount,
        schemeId,
        schemeName: scheme.name,
      };

      const responseStripe = await axios.post(
        backendUrl + "/api/donation/stripe",
        donationObj,
        { headers: { token } }
      );

      if (responseStripe.data.success) {
        const { session_url } = responseStripe.data;
        window.location.replace(session_url);
      } else {
        toast.error(responseStripe.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const grossPayment =
    formdata.netPayment && !isNaN(formdata.netPayment)
      ? (parseFloat(formdata.netPayment) * GST).toFixed(2)
      : "";

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-10 text-gray-800">
      <ToastContainer />
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-8">
          <span className="text-gray-600">Donating to:</span>{" "}
          <span className="text-black">{scheme?.name}</span>
        </h1>

        <form
          onSubmit={onSubmitHandler}
          className="space-y-6 border border-gray-200 rounded-lg p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={onChangeHandler}
              placeholder="Full Name"
              required
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
            />
            <input
              type="tel"
              name="phone"
              value={formdata.phone}
              onChange={onChangeHandler}
              placeholder="Phone Number"
              required
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
              maxLength="10"
            />
          </div>
          <input
            type="number"
            name="netPayment"
            value={formdata.netPayment}
            onChange={onChangeHandler}
            placeholder="Amount (INR)"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
          />

          {/* GST Preview */}
          {grossPayment && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">Total with GST (18%):</span> ₹
              {grossPayment}
            </div>
          )}

          {/* Terms */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-medium mb-2 text-center underline">
              Terms and Conditions
            </h2>
            <ul className="list-decimal text-sm text-gray-700 pl-4 space-y-2">
              <li>
                <strong>Voluntary Contribution:</strong> All donations are
                non-refundable.
              </li>
              <li>
                <strong>Data Privacy:</strong> Your data is securely stored and
                never shared.
              </li>
              <li>
                <strong>No Refund Policy:</strong> Refunds are only allowed for
                transaction errors.
              </li>
              <li>
                <strong>Use of Funds:</strong> Funds go directly to the selected
                scheme.
              </li>
              <li>
                <strong>Acceptance of Terms:</strong> Continuing means you
                agree.
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/schemes")}
              className="px-5 py-2 text-sm font-medium border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium bg-black text-white rounded hover:bg-black"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationDetails;
