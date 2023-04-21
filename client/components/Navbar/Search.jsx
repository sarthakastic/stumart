import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../slices/productSlice";
import { useRouter } from "next/router";
import { BiSearchAlt } from "react-icons/Bi";

const Search = () => {
  const dispatch = useDispatch();

  const [search, setSearchData] = useState();
  const [category, setCategory] = useState("");
  const router = useRouter();

  const clear = () => {
    setCurrentId(null);
    setProductData("");
  };

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search &&
      dispatch(searchProducts({ search, category })).then(
        router.push("/search")
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={handleChange}
        className="border-2 border-gray-500 focus:border-gray-500 focus:outline-none text-gray-400 placeholder-gray-400 rounded-2xl p-1 "
      />
      <button
        className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-500 rounded-2xl hover:text-gray-200 hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
        type="submit"
        placeholder="Search"
      >
        <BiSearchAlt />
      </button>
    </form>
  );
};

export default Search;
