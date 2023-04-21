import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Button from "../PredDefinedComponents/Button";
import { logout } from "../../slices/authSlice";
import { HiHome } from "react-icons/Hi";
import { FiLogIn } from "react-icons/Fi";
import { BiImageAdd } from "react-icons/Bi";

const Navigation = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [user, setUser] = useState();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null;
    setUser(initialUser);
  }, []);

  const register = () => {
    router.push("/register");
  };

  const addProduct = () => {
    router.push("/product");
  };

  const home = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-around md:justify-between items-center h-full w-full md:w-fit">
      <Button content="Home" onClick={home} icon={<HiHome />} />
      <Button
        content="Add New Product"
        onClick={addProduct}
        icon={<BiImageAdd />}
      />
      {user ? (
        <button className="" onClick={() => dispatch(logout())}>
          <img
            className=" rounded-full w-10 h-10  "
            src={user?.result?.selectedFile}
            alt="profile pic"
          />
        </button>
      ) : (
        <Button
          content="Sign Up/Log In"
          onClick={register}
          icon={<FiLogIn />}
        />
      )}
    </div>
  );
};

export default Navigation;
