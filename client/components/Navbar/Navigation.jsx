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

  const authData = useSelector((state) => state?.auth?.authData)

  console.log('authdata', authData)

  const router = useRouter()

  const [user, setUser] = useState()

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
    <div className="flex justify-around md:justify-between items-center h-full w-full md:w-fit">
      <Button content="Home" onClick={home} icon={<HiHome />} navbar={true} />
      <Button
        content="Add New Product"
        onClick={addProduct}
        icon={<BiImageAdd />}
        navbar={true}
      />
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
        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
          navbar={true}
        />
      )}
    </div>
  )
}

export default Navigation
