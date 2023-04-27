// Native Imports
import React from 'react'
import { useRouter } from 'next/router'

// Components Imports
import Button from './Button'

// Icons Imports
import { BiImageAdd, BiLocationPlus } from 'react-icons/Bi'

// Images Imports
import noPosts from '../../public/noPosts.png'

const NoPosts = (props) => {
  const router = useRouter()

  // redirect to add products
  const addProduct = () => {
    router.push('/product')
  }

  return (
    <div className="w-full flex flex-col h-fit justify-center items-center ">
      <h1 className="font-bold text-4xl w-full flex text-center justify-center p-5 text-gray-700">
        {props?.heading}
      </h1>
      <img className="h-96 bg-gray-50 rounded-full " src={noPosts.src} />
      <h4 className="font-bold text-4xl w-full flex text-center justify-center p-5 text-gray-700">
        Add a Product now.
      </h4>
      <Button
        content="Add New Product"
        onClick={addProduct}
        icon={<BiImageAdd />}
      />
    </div>
  )
}

export default NoPosts
