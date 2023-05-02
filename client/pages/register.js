import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { signin, signup } from '../slices/authSlice'
import FileBase from 'react-file-base64'
import Button from '../components/PredDefinedComponents/Button'
import registerIcon from '../public/register.png'
import UserInfo from '../components/UserInfo/UserInfo'

const register = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const toggleAuth = () => {
    setIsSignUp((prevAuth) => !prevAuth)
  }

  const router = useRouter()

  const [user, setUser] = useState()

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  if (user?.result?.name) {
    router.push('/')
  }

  return (
    <div className=" flex w-screen ">
      <div className="w-screen md:w-1/2 min-h-[920px]  bg-ternary shadow-2xl h-screen p-2 flex flex-col items-center justify-center ">
        <UserInfo />
      </div>
      <div className="w-1/2 min-h-[920px] h-screen hidden md:flex  bg-ternary justify-center items-center ">
        <img className="h-3/4" src={registerIcon.src} />
      </div>
    </div>
  )
}

export default register
