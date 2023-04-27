import React from 'react'
import { category } from '../../utils/categoryData'
import { searchProducts } from '../../slices/productSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaMotorcycle } from 'react-icons/Fa'

const Category = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState({
    search: '',
    category: '',
  })

  const handleClick = (tag) => {
    router.push(`/category/${tag}`)
  }

  useEffect(() => {
    dispatch(searchProducts(searchQuery))
  }, [searchQuery])

  return (
    <div className="flex justify-center px-14  w-screen  ">
      <div className="flex  h-fit items-start pt-5 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-900  gap-10 mt-2 flex-nowrap  ">
        {category.map((i) => (
          <div className="flex - flex-col justify-center items-center ">
            <div
              className="bg-gray-400 hover:bg-gray-200 hover:-translae-y-2 hover:shadow-[inset_-12px_-8px_40px_#46464620] md:h-20 md:w-fit p-10 flex items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:cursor-pointer text-gray-700 rounded-md"
              key={i.key}
              onClick={() => handleClick(i?.category)}
            >
              {i.icon}
            </div>
            <div className="flex justify-center w-full flex-wrap text-gray-400 mt-2 font-bold text-sm ">
              {i.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
