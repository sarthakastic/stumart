import React from "react";
import bike from "@/public/download.jpeg";
import Button from "../PredDefinedComponents/Button";

const data = [
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
  },
];

const Card = (props: any) => {
  return (
    <div className="rounded-2xl w-72 h-80 m-5 border-yellow-700 border-2 ">
      <img
        className="w-72 h-40 rounded-t-2xl "
        src={bike.src}
        alt="product image"
      />
      <div className="flex flex-col justify-evenly px-2">
        <p className="text-2xl  "> {props?.name}</p>
        <p className="px-2"> Rs.{props?.price}/-</p>
        <p className="px-2"> {props?.owner}</p>
        <p className="px-2"> {props?.hostel}</p>
        <div className="flex justify-between items-center text-xs ">
          <p className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md rounded-2xl text-yellow-200 bg-yellow-700  ">
            {props?.tag}
          </p>
          <Button content={"View more details"} />
        </div>
      </div>
    </div>
  );
};

export default Card;
