import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FileBase from "react-file-base64";
import { createProducts } from "../slices/productSlice";

const product = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [user, setUser] = useState();

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null;
    setUser(initialUser);
  }, []);

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const [productData, setProductData] = useState({
    title: "",
    cost: NaN,
    details: "",
    photos: "",
    category: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createProducts({ ...productData, name: user?.result?.name })
      ).then(router.push("/"));
      clear();
    } else {
      //   dispatch(
      //     updatePost(currentId, { ...postData, name: user?.result?.name })
      //   );
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setProductData({
      title: "",
      cost: NaN,
      details: "",
      photos: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  if (!user?.result?.name) {
    return "Please sign in to Add your product.";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        required
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="number"
        name="cost"
        required
        onChange={handleChange}
        placeholder="Cost"
      />
      <input
        type="text"
        name="details"
        required
        onChange={handleChange}
        placeholder="Details"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) =>
          setProductData({ ...productData, photos: base64 })
        }
        accept="image/png,image/jpeg"
      />
      <input
        type="text"
        name="category"
        required
        onChange={handleChange}
        placeholder="Category"
      />
      <input type="submit" value="add" />
    </form>
  );
};

export default product;
