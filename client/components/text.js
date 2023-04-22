import React from 'react'

const Text = (props) => {
  return (
    <div className="border-2 border-gray-400 rounded-2xl  p-1 text-gray-400 placeholder-gray-400 w-full ">
      {props?.text}
    </div>
  )
}

export default Text
