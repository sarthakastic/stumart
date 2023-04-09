import React from "react";
import Card from "../Card/Card";

const data = [
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 1,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 2,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 3,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 4,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 5,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 6,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 7,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 1,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 2,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 3,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 4,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 5,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 6,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 7,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 1,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 2,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 3,
  },
  {
    name: "BikeBikeBikeBikeBikeBikeBike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 4,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 5,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 6,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 7,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 1,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 2,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 3,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 4,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 5,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 6,
  },
  {
    name: "Bike",
    tag: "Bikes and cars",
    price: 50000,
    owner: "Vijay Raj",
    hostel: "Tulsidas",
    id: 7,
  },
];

const Products = () => {
  return (
    <div className="flex flex-wrap justify-center ">
      {data.map((i) => (
        <Card
          price={i.price}
          name={i.name}
          tag={i.tag}
          owner={i.owner}
          hostel={i.hostel}
        />
      ))}
    </div>
  );
};

export default Products;
