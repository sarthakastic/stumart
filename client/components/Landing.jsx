// Native Imports
import React from 'react'

// Components Imports
import Products from './Products/Products'
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
