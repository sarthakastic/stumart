import React from "react";
import Navbar from "./Navbar/Navbar";
import Products from "./Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../slices/productSlice";
import Pagination from "./Pagination/Pagination";

const Landing = () => {
  // const data = useSelector((state) => state?.posts?.currentPage);

  // const dispatch = useDispatch();

  return (
    <>
      <Products />
      <Pagination />
    </>
  );
};

export default Landing;
