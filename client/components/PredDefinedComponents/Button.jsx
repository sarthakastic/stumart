import React from "react";

const Button = (props) => {
  return (
    <button
      className=" h-fit w-fit flex items-center text-xs md:text-md gap-2 py-1 px-4 md:mx-1 shadow-md shadow-gray-400 rounded-2xl hover:text-white hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
      onClick={props?.onClick}
    >
      {props.icon}
      {props?.content}
    </button>
  );
};

export default Button;
