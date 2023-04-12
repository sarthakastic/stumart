import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice";
import Card from "../Card/Card";

const Products = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  const [postData, setPostData] = useState([]);
  // useEffect(() => {
  //   const storedProfile = localStorage.getItem("profile");
  //   const initialUser = storedProfile ? JSON.parse(storedProfile) : null;
  //   setUser(initialUser);
  // }, []);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null;
    setUser(initialUser);
    const page = 1;
    dispatch(fetchProducts(page))
      .then((posts) => {
        setPostData(posts?.payload?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(postData, "postData");

  return (
    <div className="flex flex-wrap justify-center ">
      {postData.map((i) => (
        <Card
          price={i.cost}
          name={i.title}
          tag={i.category}
          photos={i.photos[0]}
          status={i.productStatus}
          creator={i.creator}
        />
      ))}
    </div>
  );
};

export default Products;
