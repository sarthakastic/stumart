import React from "react";
import Navigation from "./Navigation";
import Search from "./Search";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#ffffff] flex h-14 border-b-[0.1px] border-yellow-700 justify-around items-center  ">
        <Search />
        <Navigation />
      </nav>
    </>
  );
};

export default Navbar;
