// Native Imports
import React from 'react'

// Redux Imports
import { useDispatch } from 'react-redux'

// Components Imports
import Button from './PredDefinedComponents/Button'

// Slice Imports
import { closeError } from '../slices/errorSlice'

// Image Imports
import error from '../public/error.png'

const Error = (props) => {
  const dispatch = useDispatch()

  /**
   * This function calls the `closeError()` function when an error occurs and close the error dialog box.
   */
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
