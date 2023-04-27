import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FileBase from 'react-file-base64'
import {
  createProducts,
  getProduct,
  updateProduct,
} from '../slices/productSlice'
import { getAddress } from '../slices/addressSlice'
import Button from '../components/PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'
import { BiLocationPlus } from 'react-icons/Bi'
import Gpt from '../components/gpt'
import * as api from '../api/index'
import AddProducts from '../components/Products/AddProducts'

const Product = (props) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [user, setUser] = useState()
  const [address, setAddress] = useState([])
  const [showOption, setShowOPtion] = useState(false)
  const [showGpt, setShowGpt] = useState(false)
  const [gpt, setGpt] = useState('')
  const [useAi, setUseAi] = useState(false)

  const [id, setId] = useState(0)

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  // const post = useSelector((state) =>
  //   currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  // )

  const selectOption = () => {
    setShowOPtion((option) => !option)
  }

  const [productData, setProductData] = useState({
    title: '',
    cost: NaN,
    details: '',
    photos: '',
    category: '',
  })

  useEffect(() => {
    props?.id &&
      dispatch(getProduct(props?.id))
        .then((response) => {
          const product = response?.payload
          console.log(product, 'id product upfdate')
          setProductData(product)
          setId(props?.id)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (id === 0) {
      await dispatch(
        createProducts({ ...productData, name: user?.result?.name })
      ).then(router.push('/'))
      clear()
    } else {
      console.log('called else')
      api
        .updateProduct(id, { ...productData, name: user?.result?.name })
        .then((result) => {
          router.reload()
          clear()
        })
        .catch((error) => {
          console.log(error, 'not updated')
        })
    }
  }

  const clear = () => {
    setId(0)
    setProductData({
      title: '',
      cost: NaN,
      details: '',
      photos: '',
      category: '',
    })
  }

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleGpt = () => {
    setShowGpt((option) => !option)
  }

  const handleAi = () => {
    setUseAi((option) => !option)
  }

  const register = () => {
    router.push('/register')
  }

  const addressPath = () => {
    router.push('/addresss')
  }

  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-gray-400 flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          Please Sign In before adding your product.
        </h1>
        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  if (!address?.name) {
    return (
      <div className="h-screen bg-gray-400 flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          Please Add your Address before posting.
        </h1>
        <Button
          content="Add Address"
          onClick={addressPath}
          icon={<BiLocationPlus />}
        />
      </div>
    )
  }

  return (
    <div className="h-screen flex justify-center   bg-gray-700 ">
      <AddProducts />
    </div>
  )
}

export default Product
