// Native Imports
import React from 'react'

// Components Imports
import Button from '../components/PredDefinedComponents/Button'

// Icons Imports
import { HiHome } from 'react-icons/Hi'

// Images Imports
import lostIcon from '../public/lost.svg'

// Redux Imports
import { useRouter } from 'next/router'

const lost = () => {
  const router = useRouter()

  /**
   * The above function redirects the user to the landing page using the router.
   */
  const home = () => {
    router.push('/')
  }

  return (
    <div className="h-screen bg-white flex flex-col justify-center items-center">
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
