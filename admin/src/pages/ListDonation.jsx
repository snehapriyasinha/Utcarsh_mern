import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Payments = ({ token }) => {
  const [payment, setPayment] = useState([]);

  const fetchAllPayments = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/donation/list",
        {},
        { headers: { token } }
      );
      //console.log(response.data);
      if (response.data.success) {
        setPayment(response.data.donations);
        //console.log(payment);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchAllPayments();
  }, [token]);
  return (
    <div>
      <h3>Payments Page</h3>
      <div>
        {payment.map((p, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img src={assets.donate_logo} alt=""></img>
            <div>
              <span className="mt-3 mb-2 font-medium">{p.schemeName}</span>
              <p>
                <b className="text-sm sm:text-[15px]">INR. {p.grossPayment}</b>
                &nbsp;(GST 18% inclusive)
              </p>
            </div>
            <div className="text-sm sm:text-[15px]">
              <p className="font-mono text-gray-600 whitespace-nowrap overflow-auto">
                {p.userId}
              </p>
              <div className="mt-3 grid grid-cols-[auto_auto] gap-y-1 gap-x-1 whitespace-nowrap">
                <span className="font-semibold text-gray-500">Donor:</span>
                <span>{p.donor.name}</span>
                <span className="font-semibold text-gray-500">Phone:</span>
                <span>{p.donor.phone}</span>
                <span className="font-semibold text-gray-500">Date:</span>
                <span>{new Date(p.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
