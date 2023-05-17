import React from 'react'
import Image from 'next/image'

import loadImage from '../../public/logo.png'

import { loader } from '../../utils/loaderData'

const Loader = () => {
  console.log(loader.length, 'loader')

  function getRandomNumber() {
    return Math.floor(Math.random() * (loader.length - 1))
  }

  // Example usage
  const randomNumber = getRandomNumber()

  return (
    <div className="fixed inset-0 z-10  bg-white bg-opacity-30h backdrop-blur-sm flex flex-col items-center justify-center ">
      <Image
        width={100}
        height={100}
        className="w-14 h-14 animate-pulse "
        src={loadImage.src}
        alt={'loading'}
      />
      <br />
      <p className="text-gray-300 font-bold text-center ">
        "{loader[randomNumber]?.value1}
      </p>
      <p className="text-gray-300 font-bold text-center ">
        {loader[randomNumber]?.value2}"
      </p>
    </div>
  )
}

export default Loader
