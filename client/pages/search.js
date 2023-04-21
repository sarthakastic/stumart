import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card/Card";

const search = () => {
  const post = useSelector((posts) => posts?.posts?.posts);
  console.log(post, "search");

  return (
    <div className="flex flex-wrap justify-center py-20 ">
      {post.map((i) => (
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

export default search;
