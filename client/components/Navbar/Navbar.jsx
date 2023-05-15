// Native Imports
import React from 'react'
import { useRouter } from 'next/router'

// Components Imports
import Navigation from './Navigation'
import Search from './Search'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className=" flex top-0 h-14 border-b-[0.1px] shadow-2xl  bg-white  z-20 justify-around items-center  border-primary fixed w-screen ">
      <h1
        onClick={() => router.push('/')}
        className="font-sigmarOne text-primary text-xl md:hidden flex hover:cursor-pointer"
      >
        STUMART{' '}
      </h1>
      <Search />
      <h1
        onClick={() => router.push('/')}
        className="font-sigmarOne text-primary text-4xl hidden md:flex hover:cursor-pointer"
      >
        STUMART{' '}
      </h1>
      <div className="hidden md:flex">
        <Navigation />
      </div>
      <div className="md:hidden bottom-0 flex h-14 border-t-[0.1px] border-primary bg-white justify-around items-center w-full fixed">
        <Navigation />
      </div>
    </nav>
  )
}

export default Navbar
