// import React, { useEffect, useState, useContext } from "react";
// import PageTitle from "../components/PageTitle";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { SchemeContext } from "../context/SchemesContext";
// import { assets } from "../assets/assets";

// const MyDonations = () => {
//   const { backendUrl, token } = useContext(SchemeContext);
//   const [payments, setPayments] = useState([]);

//   const fetchDonations = async () => {
//     console.log("Calling /api/userPayments with token:", token);

//     try {
//       if (!token) {
//         console.log("No token");
//         return null;
//       }
//       const response = await axios.post(
//         backendUrl + "/api/donation/userPayments",
//         {},
//         { headers: { token } }
//       );

//       console.log(response.data.success);
//       console.log(response.data);
//       console.log("Yes data found");
//       if (response.data.success && response.data.donations) {
//         setPayments(response.data.donations);
//       } else {
//         console.log("No donations found in response");
//         toast.error("No donations found");
//       }
//     } catch (err) {
//       console.error("Error fetching user donations:", err.message);
//       toast.error(err.message);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchDonations();
//   }, [token]);

//   return (
//     <>
//       <div className="text-4xl text-center pt-8 border-t">
//         <PageTitle txt1={"My"} txt2={"Donations"} />
//       </div>
//       <div>
//         {payments.length > 0 ? (
//           payments.map((p, index) => (
//             <div
//               key={index}
//               className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             >
//               <div className="flex items-start gap-6 text-sm">
//                 {/* Placeholder image - update if you have image per scheme */}
//                 <img
//                   className="w-50 sm:w-24"
//                   src={assets.thankyou_logo}
//                   alt=" "
//                 />
//                 <div>
//                   <p className="sm:text-base font-medium">{p.schemeName}</p>
//                   <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
//                     <p>{p.donor.name}</p>
//                     <br></br>
//                   </div>
//                   <div>
//                     <b>₹{p.grossPayment} (GST 18% incl.)</b>
//                   </div>
//                   <p>
//                     Date:{" "}
//                     <span className="text-gray-400">
//                       {new Date(p.date).toLocaleDateString()}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 flex justify-between">
//                 <div className="flex items-center gap-2">
//                   <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                   <p className="text-sm md:text-base">
//                     Thank you for your love and support.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 mt-6">
//             No donations found.
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyDonations;

import React, { useEffect, useState, useContext } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { SchemeContext } from "../context/SchemesContext";
import { assets } from "../assets/assets";

const MyDonations = () => {
  const { backendUrl, token } = useContext(SchemeContext);
  const [payments, setPayments] = useState([]);

  const fetchDonations = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/donation/userPayments",
        {},
        { headers: { token } }
      );
      if (response.data.success && response.data.donations) {
        setPayments(response.data.donations);
      } else {
        toast.error("No donations found");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchDonations();
  }, [token]);

  return (
    <>
      <div className="text-4xl text-center pt-8 border-t">
        <PageTitle txt1="My" txt2="Donations" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {payments.length > 0 ? (
          <div className="space-y-6">
            {payments.map((p, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 p-4">
                {/* Image */}
                <div className="w-full md:w-28 flex-shrink-0">
                  <img
                    src={assets.thankyou_logo}
                    alt="Donation"
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {p.schemeName}
                  </p>
                  <p className="text-sm text-gray-700">Donor: {p.donor.name}</p>
                  <p className="text-sm text-gray-800 font-medium">
                    ₹{p.grossPayment}{" "}
                    <span className="text-xs text-gray-500">
                      (GST 18% incl.)
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(p.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Thank you */}
                <div className="md:w-1/3 flex items-center md:justify-end text-sm text-green-600">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-2 inline-block"></span>
                  Thank you for your love and support.
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            No donations found.
          </div>
        )}
      </div>
    </>
  );
};

export default MyDonations;
