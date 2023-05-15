// Native Imports
import React, { useEffect, useState } from 'react'

// Redux Imports
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Slice Imports
import { getAddress } from '../slices/addressSlice'

// Components Imports
import Button from '../components/PredDefinedComponents/Button'
import AddProducts from '../components/Products/AddProducts'

// Icon Imports
import { FiLogIn } from 'react-icons/Fi'
import { BiLocationPlus } from 'react-icons/Bi'

// Images Imports
import registerIcon from '../public/register.png'
import addPost from '../public/addPost.svg'
import addressIcon from '../public/address.svg'

const Product = (props) => {
  const dispatch = useDispatch()

  const router = useRouter()

  // used to store local storage user info
  const [user, setUser] = useState()

  // used to store address getting from get address api
  const [address, setAddress] = useState([])

  /* This `useEffect` hook is used to retrieve the user profile from the local storage and set it to the
 `user` state variable. It runs only once when the component mounts, as the dependency array is
 empty. The `getItem` method is used to retrieve the `profile` key from the local storage, and if it
 exists, it is parsed into a JavaScript object using `JSON.parse`. If it doesn't exist,
 `initialUser` is set to `null`. Finally, the `setUser` function is called to update the `user`
 state variable with the retrieved user profile. */
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  /* This `useEffect` hook is used to fetch the address of the user from the server when the `user`
 state variable changes. It checks if the `user` object has a `result` property with an `_id`
 property. If it does, it dispatches the `getAddress` action with the `_id` as a parameter. The
 `getAddress` action returns a promise, which is resolved with the `response` object. The `response`
 object contains the `payload` property, which is the address of the user. The `setAddress` function
 is called to update the `address` state variable with the retrieved address. If there is an error,
 it is logged to the console. The `user` state variable is added as a dependency to the `useEffect`
 hook, so it runs whenever the `user` state variable changes. */
  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getAddress(user?.result?._id))
        .then((response) => {
          const address = response?.payload

          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [user])

  const register = () => {
    router.push('/register')
  }

  const addressPath = () => {
    router.push('/addresss')
  }

  // If user is not signed in
  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold font-montserrat text-primary ">
          Please Sign In before adding your product.
        </h1>
        <img className="h-1/2 md:h-3/4" src={registerIcon.src} />
        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  // if user has not added the address
  if (!address?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Add your Address before posting.
        </h1>
        <img className="h-1/2" src={addressIcon.src} />
        <Button
          content="Add Address"
          onClick={addressPath}
          icon={<BiLocationPlus />}
        />
      </div>
    )
  }

  return (
    <div className="md:h-screen min-h-fit overflow-y-scroll items-start md:items-center flex justify-center bg-ternary">
      <div className="flex h-3/4 md:h-full md:w-1/2 items-center md:mt-0 my-20 md:my-0 justify-center  ">
        <AddProducts />
      </div>
      <div className=" hidden md:flex md:w-1/2 items-center justify-center   ">
        <img className="h-1/2 md:h-3/4" src={addPost.src} />
      </div>
    </div>
  )
}

export default Product
