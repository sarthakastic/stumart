import React from 'react'
import lostIcon from '../public/lost.png'
import { HiHome } from 'react-icons/Hi'
import Button from '../components/PredDefinedComponents/Button'

import { useRouter } from 'next/router'

const lost = () => {
  const router = useRouter()

  const home = () => {
    router.push('/')
  }
  return (
    <div className="h-screen bg-gray-500 flex flex-col justify-center items-center">
      <img
        className="md:w-1/2 md:h-3/4"
        src={lostIcon.src}
        alt="404 not found"
      />
      <Button content="Home" onClick={home} icon={<HiHome />} />
    </div>
  )
}

export default lost
