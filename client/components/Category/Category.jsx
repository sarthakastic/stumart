// Native Imports
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

// Utils Imports
import { category } from '../../utils/categoryData'

// Slice Imports
import { searchProducts } from '../../slices/productSlice'

// Redux Imports
import { useDispatch } from 'react-redux'

const Category = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    category: '',
  })

  /**
   * The handleClick function navigates to a specific category page using React Router.
   */
  const handleClick = (tag) => {
    router.push(`/category/${tag}`)
  }

  /* `useEffect` is a React Hook that allows you to perform side effects in functional components. In
 this case, the `useEffect` hook is used to dispatch a Redux action `searchProducts` whenever the
 `searchQuery` state changes. This means that whenever the user types in a search query or selects a
 category, the `searchProducts` action will be dispatched with the updated `searchQuery` object as
 its argument. This will trigger a search for products based on the user's input. */
  useEffect(() => {
    dispatch(searchProducts(searchQuery))
  }, [searchQuery])

  return (
    <div className="flex justify-center px-14  shadow-[inset_1px_1px_10px_#18122B] bg-primary  w-screen  ">
      <div className="flex  h-fit items-start pt-5 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-900  gap-10 mt-2 flex-nowrap  ">
        {category.map((i) => (
          <div className="flex - flex-col justify-center items-center ">
            <div
              className="bg-white hover:bg-secondary hover:-translae-y-2 hover:shadow-[inset_-12px_-8px_40px_#46464620] md:h-20 md:w-fit p-10 flex items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:cursor-pointer hover:text-white text-secondary rounded-md"
              key={i.key}
              onClick={() => handleClick(i?.category)}
            >
              {i.icon}
            </div>
            <div className="flex justify-center w-full flex-wrap text-white mt-2 font-bold text-sm ">
              {i.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
