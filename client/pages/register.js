// Native Imports
import React, { useState, useEffect } from 'react'

// Redux Imports
import { useRouter } from 'next/router'

// Components Imports
import UserInfo from '../components/UserInfo/UserInfo'

// Images Imports
import registerIcon from '../public/register.png'
import { useSelector } from 'react-redux'
import Loader from '../components/PredDefinedComponents/Loader'

const register = () => {
  const router = useRouter()

  const [user, setUser] = useState() // used to store local storage data

  const load = useSelector((state) => state?.load?.isLoad)
  const error = useSelector((state) => state?.error?.isError)

  console.log(load, 'hdsbjdsvkjdvkk')

  // store local storage data
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  // if user is already log in then redirect to home page
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
      {load && !error && <Loader />}
    </div>
  )
}

export default register
