// Native Imports
import { useRouter } from 'next/router'
import React from 'react'

// Icons Imports
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillGithub,
  AiOutlineMail,
} from 'react-icons/ai'

const Footer = () => {
  const router = useRouter()

  return (
    <footer className="bg-primary w-screen h-fit mt-10 px-10 py-5 ">
      <div>
        <p className="text-white my-5 font-thin hover:cursor-pointer hover:underline ">
          About Project
        </p>
        <p
          onClick={() => router.push('/termsAndConditions')}
          className="text-white my-5 font-thin hover:cursor-pointer hover:underline "
        >
          Terms and Conditions
        </p>
        <p
          onClick={() => router.push('/history')}
          className="text-white my-5 font-thin hover:cursor-pointer hover:underline "
        >
          History
        </p>
        <p
          onClick={() => router.push('#feedback')}
          className="text-white my-5 font-thin hover:cursor-pointer hover:underline "
        >
          Give Feedback
        </p>
        <p className="text-white my-5 font-thin hover:cursor-default">
          Connect with Developer
        </p>
        <div className="flex items-center justify-start font-bold text-white text-4xl gap-2 ">
          {' '}
          <a href="https://www.linkedin.com/in/sarthakastic/">
            <AiFillLinkedin className="hover:cursor-pointer hover:text-blue-400 " />{' '}
          </a>
          <a href="https://github.com/sarthakastic">
            <AiFillGithub className="hover:cursor-pointer hover:text-black " />
          </a>
          <a href="https://twitter.com/IamsarthakGupta">
            <AiFillTwitterCircle className="hover:cursor-pointer hover:text-blue-400 " />
          </a>
          <a href="mailto:iamsg26@gmail.com">
            <AiOutlineMail className="hover:cursor-pointer hover:text-red-700  " />
          </a>
        </div>
      </div>
      <p className="text-white my-5 font-thin flex justify-center">
        Copyright reserved with Stumart @2023
      </p>
    </footer>
  )
}

export default Footer
