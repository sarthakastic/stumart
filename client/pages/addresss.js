// Native Imports
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

// Redux Imports
import { useDispatch } from 'react-redux'

// Slice Imports
import { addAddress, getAddress } from '../slices/addressSlice'

// Components Imports
import Button from '../components/PredDefinedComponents/Button'
import AddAddress from '../components/Address/AddAddress'

// Icon Imports
import { FiLogIn } from 'react-icons/Fi'

// Images Imports
import addressIcon from '../public/address.svg'

const addresss = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  // used to store user data from local storage
  const [user, setUser] = useState()

  // used to store address from api response
  const [address, setAddress] = useState([])

  /* This `useEffect` hook is used to retrieve the user data from local storage and set it to the
  `user` state variable. It runs only once when the component mounts, as the dependency array `[]`
  is empty. The `localStorage.getItem('profile')` method retrieves the value of the 'profile' key
  from the local storage, and if it exists, it is parsed using `JSON.parse()` and set to the
  `initialUser` variable. Otherwise, `initialUser` is set to `null`. Finally, the `setUser()`
  function is called to update the `user` state variable with the `initialUser` value. */
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  /* This `useEffect` hook is used to fetch the user's address from the server and set it to the
 `address` state variable. It runs whenever the `user` state variable changes, as `user` is included
 in the dependency array `[user]`. */
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

  /**
   * The function redirects the user to the registration page using the router.
   */
  const register = () => {
    router.push('/register')
  }

  /**
   * The above function redirects the user to the landing page using the router.
   */
  const home = () => {
    router.push('/')
  }

  // if not signed in
  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Sign In to add address.
        </h1>

        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  // if address added return to landing page
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
