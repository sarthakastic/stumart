import React from "react";

import sampleProfilePic from "@/public/sampleProfilePic.png";
import Button from "../PredDefinedComponents/Button";

const Navigation = () => {
  return (
    <div className="flex justify-around items-center h-full ">
      <Button content="Home" />
      <Button content="Add New Product" />
      <button className="">
        <img
          className=" rounded-full w-10 h-10  "
          src={sampleProfilePic.src}
          alt="profile pic"
        />
      </button>
    </div>
  );
};

export default Navigation;
