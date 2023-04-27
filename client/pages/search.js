import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/PredDefinedComponents/Card'

const search = () => {
  const post = useSelector((posts) => posts?.posts?.posts)

  return (
    <div className="flex flex-wrap justify-center py-20 ">
      <h1 className="font-bold text-4xl w-full flex justify-start p-5 text-gray-700">
        Search Results :
      </h1>
      {post.map((i) => (
        <Card
          price={i.cost}
          name={i.title}
          tag={i.category}
          photos={i.photos[0]}
          status={i.productStatus}
          creator={i.creator}
          id={i._id}
        />
      ))}
    </div>
  )
}

export default search
