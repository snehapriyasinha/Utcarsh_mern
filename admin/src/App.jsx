import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Fixed capitalization
import { Route, Routes } from "react-router-dom";
import AddDonee from "./pages/AddDonee";
import AddScheme from "./pages/AddScheme";
import ListDonee from "./pages/ListDonee";
import ListScheme from "./pages/ListScheme";
import ListDonation from "./pages/ListDonation";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  //for user auth
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar /> {/* Fixed Sidebar tag */}
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/addDonee" element={<AddDonee token={token} />} />
                <Route
                  path="/addScheme"
                  element={<AddScheme token={token} />}
                />
                <Route
                  path="/listDonee"
                  element={<ListDonee token={token} />}
                />
                <Route
                  path="/listScheme"
                  element={<ListScheme token={token} />}
                />
                <Route
                  path="/listDonation"
                  element={<ListDonation token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
