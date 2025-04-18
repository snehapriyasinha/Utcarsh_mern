import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { DoneesContext } from "../context/DoneesContext";
import PageTitle from "../components/PageTitle";
import DoneeItem from "../components/DoneeItem";
import Searchbar from "../components/Searchbar";

const Recipients = () => {
  const { donees, search } = useContext(DoneesContext);
  const [filterDonees, setFilterDonees] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (Array.isArray(donees)) {
      setFilterDonees(donees);
    }
  }, [donees]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((t) => t !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let doneesCopy = donees.slice();

    if (search !== "") {
      doneesCopy = doneesCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.state.toLowerCase().includes(search.toLowerCase()) ||
          item.city.toLowerCase().includes(search.toLowerCase()) ||
          item.address.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      doneesCopy = doneesCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    setFilterDonees(doneesCopy);
  };

  useEffect(() => {
    // console.log(category);
    applyFilter();
  }, [category, search, donees]);

  return (
    <>
      <Searchbar></Searchbar>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Display Filters */}
        <div className="min-w-60">
          <p className="my-2 text-xl flex items-center gap-2">FILTERS</p>
          <div className="border border-gray-300 pl-5 py-3 mt-6 my-5 sm:bl">
            <p className="mb-3 text-sm font-medium ">DONATE TO</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  id="ngo"
                  name="ngo"
                  value={"ngo"}
                  onChange={toggleCategory}
                />
                <label htmlFor="ngo">NGO</label>
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  id="village"
                  name="village"
                  value={"village"}
                  onChange={toggleCategory}
                />
                <label htmlFor="village">Village</label>
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  id="slum"
                  name="slum"
                  value={"slum"}
                  onChange={toggleCategory}
                />
                <label htmlFor="slum">Slum</label>
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  id="individual"
                  name="individual"
                  value={"individual"}
                  onChange={toggleCategory}
                />
                <label htmlFor="individual">Individual</label>
              </p>
            </div>
          </div>
        </div>

        {/* Display Recipients */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <PageTitle txt1={"ALL"} txt2={"DONEES"} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterDonees.map((donee, index) => (
              <DoneeItem
                key={index}
                id={donee._id}
                name={donee.name}
                category={donee.category}
                city={donee.city}
                state={donee.state}
                phone={donee.phone}
                image={donee.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipients;
