import React, { useContext } from "react";
import { DoneesContext } from "../context/DoneesContext";

const DisplayDonees = () => {
  const donees = useContext(DoneesContext);
  //console.log(donees);
  return <div></div>;
};

export default DisplayDonees;
