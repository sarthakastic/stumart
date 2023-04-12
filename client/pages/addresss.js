import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../slices/addressSlice";

const addresss = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [user, setUser] = useState();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null;
    setUser(initialUser);
  }, []);

  const [productData, setProductData] = useState({
    hostel: "",
    room: NaN,
    floor: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setProductData({
      hostel: "",
      room: NaN,
      floor: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      addAddress({
        ...productData,
        name: user?.result?.name,
        contact: user?.result?.phoneNumber,
      })
    ).then(router.push("/"));
    clear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="hostel"
        required
        onChange={handleChange}
        placeholder="Hostel"
      />
      <input
        type="text"
        name="floor"
        required
        onChange={handleChange}
        placeholder="Floor"
      />
      <input
        type="number"
        name="room"
        required
        onChange={handleChange}
        placeholder="Room Number"
      />
      <input type="submit" value="add" />
    </form>
  );
};

export default addresss;
