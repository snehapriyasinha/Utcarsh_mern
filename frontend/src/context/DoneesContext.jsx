import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const DoneesContext = createContext();

const DoneesContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [donees, setDonees] = useState([]);

  const getDoneesData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/donee/list");
      //console.log("API Response:", response.data);
      setDonees(response.data.donees || []);
    } catch (error) {
      console.log("API Fetch Error:", error);
      setDonees([]); // Avoid undefined state
    }
  };

  useEffect(() => {
    getDoneesData();
  }, []);

  const value = {
    donees,
    search,
    setSearch,
    backendUrl,
  };

  return (
    <DoneesContext.Provider value={value}>
      {props.children}
    </DoneesContext.Provider>
  );
};

export default DoneesContextProvider;
