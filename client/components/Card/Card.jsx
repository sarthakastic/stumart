import React, { useState, useEffect } from 'react'
import Button from '../PredDefinedComponents/Button'
import { getAddress } from '../../slices/addressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Card = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [address, setAddress] = useState([])
  const creator = props.creator

  useEffect(() => {
    // Make sure `props.creator` is a valid string value
    if (props.creator) {
      // Dispatch the getAddress action with `props.creator` as an argument
      dispatch(getAddress(creator))
        .then((response) => {
          const address = response?.payload
          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [props.creator])

  const productDetails = () => {
    router.push(`/product/${props?.id}`)
  }

  return (
    <div className="rounded-2xl w-72 h-80 m-5 border-2 border-gray-500 bg-white ">
      <img
        className="w-72 h-40 rounded-t-2xl "
        src={props?.photos}
        alt="product image"
      />
      <div className="flex flex-col justify-evenly px-2">
        <p className="text-2xl  "> {props?.name}</p>
        <p className="px-2"> Rs.{props?.price}/-</p>

        {address && (
          <>
            <p className="px-2"> {address?.name} </p>
            <p className="px-2">{address?.hostel} </p>
          </>
        )}
        <div className="flex justify-between items-center text-xs ">
          <p className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md rounded-2xl text-gray-200 bg-gray-700  ">
            {props?.tag}
          </p>
          {props?.status ? (
            <div className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 flex justify-center rounded-lg text-white translate-y-10 bottom-10 text-xl bg-clip-content w-28 ">
              Sold
            </div>
          ) : (
            <Button content={'View more details'} onClick={productDetails} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
