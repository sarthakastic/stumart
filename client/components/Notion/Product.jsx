// Native Imports
import React from 'react'
import { useRouter } from 'next/router'

// Image Imports
import add from '../../public/add.svg'

const Product = () => {
  const router = useRouter()

  return (
    <div className="w-full h-full hover:cursor-pointer ">
      <img
        className="w-full"
        onClick={() => router.push('/product')}
        src={add.src}
        alt="add"
      />
    </div>
  )
}

export default Product
