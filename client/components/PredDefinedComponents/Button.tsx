import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = (props: any) => {
  return (
    <button
      className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-400 rounded-2xl hover:text-yellow-200 hover:bg-yellow-700 border-yellow-700 text-yellow-700 border-2 "
      onClick={props?.onClick}
    >
      {console.log(props?.icon, "xhbcjdck")}
      <FontAwesomeIcon icon={props?.icon} />
      {props?.content}
      {console.log(props?.icon, "nbdvjhcdk")}
    </button>
  );
};

export default Button;
