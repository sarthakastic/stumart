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
    <div className=" flex  ">
      <div className="w-1/2 min-h-[920px] h-screen hidden md:flex  bg-gray-400  justify-center items-center ">
        <img className="h-3/4" src={registerIcon.src} />
      </div>
      <div className="w-screen md:w-1/2 min-h-[920px]  bg-gray-400  h-screen p-2 flex flex-col items-center justify-center ">
        <div className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          {isSignUp ? (
            <h1>
              Hey, it's always good
              <br /> to see new beautiful faces!
            </h1>
          ) : (
            <h1>
              Hey, it's always good to
              <br /> see beautiful faces once again!
            </h1>
          )}
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col  shadow-[rgba(1,_7,_5,_0.2)_0px_60px_40px_-7px]  ">
          <UserInfo isSignUp={isSignUp} />
          <div className="flex justify-center">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            {isSignUp ? (
              <Button content="Sign In" onClick={toggleAuth} />
            ) : (
              <Button content="Sign Up" onClick={toggleAuth} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default register
