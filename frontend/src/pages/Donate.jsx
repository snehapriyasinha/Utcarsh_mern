import React from "react";
import DisplayDonees from "../components/DisplayDonees";
import DonationType from "../components/DonationType";
const Donate = () => {
  return (
    <div>
      <DonationType></DonationType>
      <DisplayDonees></DisplayDonees>
    </div>
  );
};

export default Donate;
