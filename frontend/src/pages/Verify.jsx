import React, { useEffect } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SchemeContext } from "../context/SchemesContext";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { backendUrl, token } = useContext(SchemeContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const paymentId = searchParams.get("paymentId");
  const verifyPayment = async () => {
    try {
      console.log("Starting verification...");
      if (!token) {
        console.warn("No token found, exiting early.");
        return null;
      }
      console.log("Sending verification request...");
      const response = await axios.post(
        backendUrl + "/api/donation/verifyStripe",
        { success, paymentId },
        { headers: { token } }
      );

      console.log("Verification response:", response.data);

      if (response.data.success) {
        toast.success("Payment Successful");
        console.log("Navigating to /MyDonations...");
        navigate("/MyDonations");
      } else {
        toast.error(response.data.message || "Verification failed");
        navigate("/Schemes");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!token) {
      console.log("Token not ready yet.");
      return;
    }
    console.log("Token ready, calling verifyPayment...");
    verifyPayment();
  }, [token]);

  return (
    <div>{token ? "Verifying payment..." : "Preparing verification..."}</div>
  );
};

export default Verify;
