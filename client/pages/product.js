import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { getAddress } from '../slices/addressSlice'

import Button from '../components/PredDefinedComponents/Button'
import AddProducts from '../components/Products/AddProducts'

import { FiLogIn } from 'react-icons/Fi'
import { BiLocationPlus } from 'react-icons/Bi'

import registerIcon from '../public/register.png'
import addPost from '../public/addPost.svg'
import addressIcon from '../public/address.svg'

const Product = (props) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [user, setUser] = useState()
  const [address, setAddress] = useState([])

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getAddress(user?.result?._id))
        .then((response) => {
          const address = response?.payload

          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [user])

  const register = () => {
    router.push('/register')
  }

  const addressPath = () => {
    router.push('/addresss')
  }

  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold font-montserrat text-primary ">
          Please Sign In before adding your product.
        </h1>
        <img className="h-1/2 md:h-3/4" src={registerIcon.src} />
        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  if (!address?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Add your Address before posting.
        </h1>
        <img className="h-1/2" src={addressIcon.src} />
        <Button
          content="Add Address"
          onClick={addressPath}
          icon={<BiLocationPlus />}
        />
      </div>
    )
  }

  return (
    <div className="h-screen min-h-fit overflow-y-scroll items-start md:items-center flex justify-center   bg-ternary">
      <div className=" hidden md:flex md:w-1/2 items-center justify-center   ">
        <img className="h-1/2 md:h-3/4" src={addPost.src} />
      </div>
      <div className="flex h-3/4 md:h-full md:w-1/2 items-center md:mt-0 mt-20 justify-center  ">
        <AddProducts />
      </div>
    </div>
  )
}

export default Product
