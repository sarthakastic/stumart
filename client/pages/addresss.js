import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAddress, getAddress } from '../slices/addressSlice'
import addressIcon from '../public/address.svg'

import Button from '../components/PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'
import AddAddress from '../components/Address/AddAddress'
import registerIcon from '../public/register.png'

const addresss = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [user, setUser] = useState()

  const [showHostel, setShowHostel] = useState(false)
  const [showFloor, setShowFloor] = useState(false)
  const [address, setAddress] = useState([])

  const selectHostel = () => {
    setShowHostel((option) => !option)
  }

  const selectFloor = () => {
    setShowFloor((option) => !option)
  }

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

  const [productData, setProductData] = useState({
    hostel: '',
    room: NaN,
    floor: '',
  })

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setProductData({
      hostel: '',
      room: NaN,
      floor: '',
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(
      addAddress({
        ...productData,
        name: user?.result?.name,
        contact: user?.result?.phoneNumber,
      })
    ).then(router.push('/'))
    clear()
  }
  const register = () => {
    router.push('/register')
  }

  const home = () => {
    router.push('/')
  }

  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Sign In to view details.
        </h1>

        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  if (address?.name) {
    return home()
  }

  return (
    <div className=" flex w-screen ">
      <div className="w-screen md:w-1/2 min-h-[920px]  bg-ternary shadow-2xl h-screen p-2 flex flex-col items-center justify-center ">
        <AddAddress />
      </div>
      <div className="w-1/2 min-h-[920px] h-screen hidden md:flex  bg-ternary justify-center items-center ">
        <img className="h-3/4" src={addressIcon.src} />
      </div>
    </div>
  )
}

export default addresss
