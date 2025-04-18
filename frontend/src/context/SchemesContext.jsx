import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SchemeContext = createContext();

const SchemeContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [schemes, setSchemes] = useState([]);
  const [token, setToken] = useState("");

  const value = {
    schemes,
    backendUrl,
    setToken,
    token,
  };

  // Get all schemes
  const getSchemesData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/scheme/list");
      //console.log("API Response:", response.data);
      setSchemes(response.data.schemes || []);
    } catch (error) {
      console.log("API Fetch Error:", error);
      setSchemes([]); // Prevent undefined state
    }
  };

  useEffect(() => {
    getSchemesData();

    // Load token from localStorage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Token loaded from localStorage:", storedToken);
      setToken(storedToken);
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  return (
    <SchemeContext.Provider value={value}>
      {props.children}
    </SchemeContext.Provider>
  );
};

export default SchemeContextProvider;
