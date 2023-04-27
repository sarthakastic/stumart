import React from 'react'
import { useDispatch } from 'react-redux'
import Button from './PredDefinedComponents/Button'
import { closeError } from '../slices/errorSlice'

const Error = (props) => {
  const dispatch = useDispatch()

  const handleError = () => {
    dispatch(closeError())
  }

  return (
    <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
      <div className="bg-white h-1/6 w-1/6 flex flex-col justify-around items-center rounded-lg ">
        <Button content={'close'} onClick={handleError} />
        <p className="text-red-500 font-bold ">{props?.error}</p>
      </div>
    </div>
  )
}

export default Error
