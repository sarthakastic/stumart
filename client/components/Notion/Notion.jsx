// Native IMports
import React from 'react'

// Components Imports
import Feedback from './Feedback'
import Github from './Github'
import Product from './Product'

const Notion = () => {
  return (
    <div className="h-full flex flex-col md:flex-row max-w-screen px-5 gap-5 ">
      <div className="md:w-1/2 ">
        <div className="h-1/2 m-2 flex justify-center items-center ">
          <div>
            <Product />
          </div>
        </div>
        <div className="h-1/2 m-2 flex justify-center items-center">
          <div>
            <Github />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 max-h-[100%] ">
        {' '}
        <Feedback />{' '}
      </div>
    </div>
  )
}

export default Notion
