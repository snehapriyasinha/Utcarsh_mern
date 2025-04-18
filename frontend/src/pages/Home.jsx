import React from "react";
import Hero from "../components/Hero";
import Policy from "../components/Policy";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <div className="py-20 mt-20 mb-20">
        <Policy></Policy>
      </div>
    </div>
  );
};

export default Home;
