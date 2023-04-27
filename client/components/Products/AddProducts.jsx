import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FileBase from 'react-file-base64'
import {
  createProducts,
  getProduct,
  updateProduct,
} from '../../slices/productSlice'
import { getAddress } from '../../slices/addressSlice'
import Button from '../PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'
import { BiLocationPlus } from 'react-icons/Bi'
import Gpt from '../gpt'
import * as api from '../../api/index'

const AddProducts = (props) => {
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
    console.log('nbdvcjhdg')
    if (user?.result?._id) {
      dispatch(getAddress(user?.result?._id))
        .then((response) => {
          const address = response?.payload
          console.log(address, 'address')
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
      ).then(router.replace('/'))
      clear()
    } else {
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
      <div className="h-screen bg-gray-400 flex flex-col  justify-center items-center">
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
    <div className=" flex items-center justify-center">
      <form
        className="flex flex-col  items-center m-2 justify-center bg-white p-5 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="text"
          name="title"
          required
          value={productData?.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="number"
          name="cost"
          value={productData?.cost}
          required
          onChange={handleChange}
          placeholder="Cost"
        />
        <textarea
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="text"
          name="details"
          required
          value={productData?.details}
          onChange={handleChange}
          placeholder="Details"
        />
        <div className="text-gray-500 font-bold text-xs m-2">
          Don't know exactly what to write in details? Use AI to write it for
          you.{' '}
          <span
            onClick={handleAi}
            className="border-2 hover:cursor-pointer hover:text-gray-200 hover:bg-gray-400 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-fit "
          >
            Use AI
          </span>
        </div>
        {useAi && (
          <div className=" w-full h-fit ">
            <input
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              placeholder="Enter prompt here!"
              type="text"
              value={gpt}
              onChange={(e) => setGpt(e.target.value)}
            />
            <div className="m-2 text-gray-500 font-bold text-xs">
              {' '}
              Try "Write a post for selling iphone 14 used 6 months in 50 words"
              <span
                className="border-2 hover:cursor-pointer hover:text-gray-200 hover:bg-gray-400 border-gray-400 rounded-2xl m-1 p-1 text-gray-400 placeholder-gray-400 w-fit "
                onClick={handleGpt}
              >
                {' '}
                Ask AI
              </span>
            </div>
          </div>
        )}
        {showGpt && useAi && gpt !== '' && <Gpt content={gpt} />}
        <div className="flex items-center w-full ">
          <input
            required
            className="border-2 border-gray-400 rounded-2xl  p-1 text-gray-400 placeholder-gray-400 w-full "
            value={productData?.category}
            placeholder="choose category"
          />
          {showOption ? (
            <IoMdArrowDropupCircle
              className="text-3xl hover:cursor-pointer text-gray-400"
              onClick={selectOption}
            />
          ) : (
            <IoMdArrowDropdownCircle
              className="text-3xl hover:cursor-pointer  text-gray-400"
              onClick={selectOption}
            />
          )}
        </div>
        {showOption && (
          <select
            className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
            name="category"
            required
            value={productData?.category}
            size="3"
            onChange={handleChange}
          >
            <option onClick={selectOption} value="Books">
              Books
            </option>
            <option onClick={selectOption} value="Bikes and Cars">
              Bikes and Cars
            </option>
            <option onClick={selectOption} value="Bike or Car accessories">
              Bike or Car accessories
            </option>
            <option onClick={selectOption} value="Clothes or Footwear">
              Clothes or Footwear
            </option>
            <option onClick={selectOption} value="Cooler">
              Cooler
            </option>
            <option onClick={selectOption} value="Cycles">
              Cycles
            </option>
            <option onClick={selectOption} value="Headphones">
              Headphones
            </option>
            <option onClick={selectOption} value="Heater">
              Heater
            </option>
            <option onClick={selectOption} value="Induction/Kettle">
              Induction/Kettle
            </option>
            <option onClick={selectOption} value="Laptop">
              Laptop
            </option>
            <option
              onClick={selectOption}
              value="Mattress or Pillow or Blanket"
            >
              Mattress or Pillow or Blanket
            </option>
            <option onClick={selectOption} value="Mobiles">
              Mobiles
            </option>
            <option onClick={selectOption} value="Mobile or Laptop accessories">
              Mobile or Laptop accessories
            </option>
            <option onClick={selectOption} value="Sports equipment">
              Sports equipment
            </option>
            <option onClick={selectOption} value="Utensils">
              Utensils
            </option>
            <option onClick={selectOption} value="Others">
              Others
            </option>
          </select>
        )}
        <div
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          required
        >
          {!productData?.photos && (
            <label
              className=" rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              required
            >
              Add Image (JPEG,PNG)
            </label>
          )}
          <input
            className="w-1 h-1"
            value={productData?.photos}
            required
          ></input>
          {productData?.photos && (
            <img required className=" w-14 h-14  " src={productData?.photos} />
          )}{' '}
        </div>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setProductData({ ...productData, photos: base64 })
          }
          accept="image/png,image/jpeg"
        />
        <input
          className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-500 rounded-2xl hover:text-gray-200 hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
          type="submit"
          value="add"
        />
      </form>
    </div>
  )
}

export default AddProducts
