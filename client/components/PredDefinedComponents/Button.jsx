// Native Imports
import React from 'react'

const Button = (props) => {
  return (
    <div
      className={`bg-transparent border-2 ${
        props?.error ? 'border-white' : 'border-secondary'
      } p-2 flex items-center justify-center `}
    >
      <button
        className={` h-fit w-full flex justify-center items-center text-xs   md:text-md gap-2 py-1 px-4 md:mx-1 shadow-md ${
          props?.error ? 'bg-white' : 'bg-secondary'
        }  `}
        onClick={props?.onClick}
      >
        <span
          className={`text-xl ${
            props?.error ? 'text-secondary' : 'text-white'
          } `}
        >
          {props.icon}
        </span>
        <span
          className={`font-bold text-md shadow-2xl  ${
            props?.error ? 'text-secondary text-2xl  ' : 'text-white'
          } `}
        >
          {props?.content}
        </span>
      </button>
    </div>
  )
}

export default Button
