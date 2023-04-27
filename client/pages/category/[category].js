// Native Imports
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux Imports
import { searchProducts } from '../../slices/productSlice'

// Components Imports
import Card from '../../components/PredDefinedComponents/Card'
import NoPosts from '../../components/PredDefinedComponents/NoPosts'

const CategoryProduct = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const category = router.query.category

  const post = useSelector((posts) => posts?.posts?.posts)

  const search = '' // set search as empty string

  // call search slice
  useEffect(() => {
    dispatch(searchProducts({ search, category }))
  }, [category])

  return (
    <div className={`py-20 ${post?.length === 0 && 'bg-gray-400'}`}>
      {post.length > 0 && (
        <h1 className="font-bold text-4xl w-full flex text-center justify-start p-5 text-gray-700">
          Products in {category}
        </h1>
      )}
      {/* if there's no search results */}
      <div className="h-screen md:flex-row w-screen  flex flex-col items-center md:items-start justify-start ">
        {post.length <= 0 && (
          <NoPosts
            heading={`Oops! No Posts in category
        ${category}.`}
          />
        )}
        {/* search results */}
        {post.map((i) => (
          <>
            <Card
              price={i.cost}
              name={i.title}
              tag={i.category}
              photos={i.photos[0]}
              status={i.productStatus}
              creator={i.creator}
              id={i._id}
            />
          </>
        ))}
      </div>
    </div>
  )
}

export default CategoryProduct
