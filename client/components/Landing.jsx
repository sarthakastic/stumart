import React from 'react'
import Navbar from './Navbar/Navbar'
import Products from './Products/Products'
import { useDispatch, useSelector } from 'react-redux'
import { pagination } from '../slices/productSlice'
import Pagination from './Pagination/Pagination'
import Carousel from './Carousel/Carousel'

const Landing = () => {
  return (
    <div className="flex flex-col items-center h-fit min-h-screen py-20 ">
      <Carousel />
      <Products />
      <Pagination />
    </div>
  )
}

export default Landing