import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import PostRequest from "./pages/PostRequest";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recipients from "./pages/Recipients";
import RecipientInfo from "./pages/RecipientInfo";
import Schemes from "./pages/Schemes";
import DonationDetails from "./pages/DonationDetails";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyDonations from "./pages/MyDonations";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm]">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/Donate" element={<Donate></Donate>}></Route>
        <Route
          path="/PostRequest"
          element={<PostRequest></PostRequest>}
        ></Route>
        <Route path="/About" element={<About></About>}></Route>
        <Route path="/Contact" element={<Contact></Contact>}></Route>
        <Route path="/Recipients" element={<Recipients></Recipients>}></Route>
        <Route
          path="/RecipientInfo/:doneeId"
          element={<RecipientInfo></RecipientInfo>}
        ></Route>
        <Route path="/Schemes" element={<Schemes></Schemes>}></Route>
        <Route
          path="/DonationDetails/:schemeId"
          element={<DonationDetails></DonationDetails>}
        ></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route
          path="/MyDonations"
          element={<MyDonations></MyDonations>}
        ></Route>
        <Route path="/Verify" element={<Verify></Verify>}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer></Footer>
    </div>
  );
};

export default App;
