import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pagination } from "../../slices/productSlice";

const Pagination = () => {
  const numberOfPages = useSelector((state) => state?.posts?.numberOfPages);

  const dispatch = useDispatch();

  let pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push({
      key: i,
      value: i,
    });
  }

  pages.map((data) => console.log(data, "map"));

  const inc = (data) => dispatch(pagination(data)).then(console.log("first"));

  return (
    <div className="flex gap-4 w-10 h-10 ">
      {pages.map((data) => (
        <button
          key={data.key}
          className="rounded-full p-2 flex border-2 cursor-pointer "
          onClick={() => inc(data?.value)}
        >
          {" "}
          {data.value}{" "}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
