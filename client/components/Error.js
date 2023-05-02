import React from 'react'
import { useDispatch } from 'react-redux'
import Button from './PredDefinedComponents/Button'
import { closeError } from '../slices/errorSlice'
import error from '../public/error.png'

const Error = (props) => {
  const dispatch = useDispatch()

  const handleError = () => {
    dispatch(closeError())
  }

  return (
    <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
      <div className="bg-primary h-fit w-fit p-10 flex flex-col justify-around items-center rounded-lg ">
        <img className=" h-1/2" src={error.src} />
        <p className="text-white font-montserrat text-2xl font-bold ">
          {props?.error}
        </p>
        <br />
        <Button content={'Close'} error={true} onClick={handleError} />
      </div>
    </div>
  )
}

export default Error
