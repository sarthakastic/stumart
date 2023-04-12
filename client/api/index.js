import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001/",
});

export const createProduct = (newPost) =>
  API.post("/product", newPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const addAddress = (formData) =>
  API.post("/address", formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`,
      "X-Custom-Header": "foobar",
    },
  });

export const signin = (formData) => API.post("/users/signin", formData);

export const signup = (formData) => API.post("/users/signup", formData);

export const fetchProducts = (page) => API.get(`/product?page=${page}`);

export const getAddress = (creator) => API.get(`/address?creator=${creator}`);
