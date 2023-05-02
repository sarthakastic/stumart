// Native Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

// Components Imports
import Button from '../PredDefinedComponents/Button'

// Icons Imports
import { HiHome } from 'react-icons/Hi'
import { FiLogIn } from 'react-icons/Fi'
import { BiImageAdd } from 'react-icons/Bi'

const Navigation = () => {
  const dispatch = useDispatch()

  const authData = useSelector((state) => state?.auth?.authData) // set authdata on sign in/sign up to fetch profile pic in navbar on each change

  const router = useRouter()

  const [user, setUser] = useState() // fetch user data from local storage

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [authData])

  //  Redirect to sign up/sign in
  const register = () => {
    router.push('/register')
  }

  // Redirect to add product
  const addProduct = () => {
    router.push('/product')
  }

  // Redirect to my profile
  const myProfile = () => {
    router.push(`/myProfile/${user?.result?._id}`)
  }

  // Redirect to home
  const home = () => {
    router.push('/')
  }

  return (
    <div className="flex justify-around gap-2 px-1 md:gap-4 md:justify-between items-center h-full w-full md:w-fit">
      <span
        onClick={home}
        className="flex items-center gap-2 hover:cursor-pointer "
      >
        <HiHome className=" text-black font-thin " />
        <p className="font-montserrat text-sm font-thin text-black hover:underline ">
          Home
        </p>
      </span>
      <span
        onClick={addProduct}
        className="flex items-center gap-2 hover:cursor-pointer "
      >
        <BiImageAdd className=" text-black font-thin" />
        <p className="font-montserrat font-thin text-sm text-black hover:underline ">
          Add New Product
        </p>
      </span>

      {/* if user login then show it's profile pic else sign up/sign in button */}
      {user ? (
        <button className="" onClick={myProfile}>
          <img
            className=" rounded-full w-10 h-10  "
            src={user?.result?.selectedFile}
            alt="profile pic"
          />
        </button>
      ) : (
        <span
          onClick={register}
          className="flex items-center gap-2 hover:cursor-pointer "
        >
          <FiLogIn className=" text-black font-thin" />
          <p className="font-montserrat font-thin text-sm text-black hover:underline ">
            Sign Up/Sign In
          </p>
        </span>
      )}
    </div>
  )
}

export default Navigation
