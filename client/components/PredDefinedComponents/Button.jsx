import React from 'react'
import Navbar from '../Navbar/Navbar'

const Button = (props) => {
  return (
    <button
      className={` h-fit w-fit flex items-center text-xs md:text-md gap-2 py-1 px-4 md:mx-1 shadow-md  rounded-2xl hover:text-white hover:bg-gray-400 border-gray-700 text-gray-500  ${
        props?.navbar ? 'null' : ' border - 2'
      } `}
      onClick={props?.onClick}
    >
      <span className="text-xl">{props.icon}</span>
      <span className="font-bold text-md ">{props?.content}</span>
    </button>
  )
}

export default Button
