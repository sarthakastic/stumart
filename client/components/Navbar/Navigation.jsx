import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Button from "../PredDefinedComponents/Button";
import { logout } from "../../slices/authSlice";

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
    <div className="flex justify-around items-center h-full ">
      <Button content="Home" onClick={home} />
      <Button content="Add New Product" onClick={addProduct} />
      {user ? (
        <button className="" onClick={() => dispatch(logout())}>
          <img
            className=" rounded-full w-10 h-10  "
            src={user?.result?.selectedFile}
            alt="profile pic"
          />
        </button>
      ) : (
        <Button content="Sign Up/Log In" onClick={register} />
      )}
    </div>
  );
};

export default Navigation;
