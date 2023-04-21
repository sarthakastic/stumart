import React from "react";
import Navigation from "./Navigation";
import Search from "./Search";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <>
      <nav className=" flex top-0 h-14 border-b-[0.1px] bg-gray-600 justify-around items-center fixed w-full ">
        <img className="w-28 h-12" src={logo.src} />
        <Search />
        <div className="hidden md:flex">
          <Navigation />
        </div>
        <div className="md:hidden bottom-0 flex h-14 border-b-[0.1px] bg-gray-600 justify-around items-center w-full fixed">
          <Navigation />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
