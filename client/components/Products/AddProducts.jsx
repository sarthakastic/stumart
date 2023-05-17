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
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io'
import { FiLogIn } from 'react-icons/fi'
import { BiLocationPlus } from 'react-icons/bi'
import Error from '../Error'
import Gpt from '../gpt'
import * as api from '../../api/index'
import registerIcon from '../../public/register.png'

const AddProducts = (props) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const error = useSelector((state) => state?.error)

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

  const reload = () => {
    router.reload('/product')
    return
  }

  const replace = () => {
    router.replace('/')
    return
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (id === 0) {
      await dispatch(
        createProducts({ ...productData, name: user?.result?.name })
      ).then(error?.isError ? reload : replace)
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
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Sign In to view details.
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
    <div className=" flex items-center justify-center flex-col bg-white shadow-2xl rounded-2xl ">
      <h4 className="text-2xl flex justify-center items-center text-center my-4 font-montserrat font-bold text-secondary ">
        Add your Product!
      </h4>
      <form
        className="flex flex-col  items-start m-2 justify-center bg-white p-5 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <input
          className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
          type="text"
          name="title"
          maxLength={25}
          required
          value={productData?.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <p className="w-full flex justify-end text-primary font-thin ">
          {25 - productData?.title?.length}/25
        </p>
        <input
          className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
          type="number"
          name="cost"
          value={productData?.cost}
          required
          onChange={handleChange}
          placeholder="Cost"
        />
        <textarea
          className=" outline-transparent border-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
          type="text"
          name="details"
          maxLength={300}
          required
          value={productData?.details}
          onChange={handleChange}
          placeholder="Details"
        />
        <p className="w-full flex justify-end text-primary font-thin ">
          {300 - productData?.details?.length}/300
        </p>
        <div className="text-secondary font-bold text-xs m-2">
          Don't know exactly what to write in details? Use AI to write it for
          you.{' '}
          <div className="w-fit p-[0.1px] mt-1 border-[1px] border-primary">
            <div
              onClick={handleAi}
              className="border-2 hover:cursor-pointer px-5 hover:text-white hover:bg-secondary border-secondary m-2 p-1 text-secondary placeholder-gray-400 w-fit "
            >
              Use AI
            </div>
          </div>
        </div>
        {useAi && (
          <div className=" w-full h-fit ">
            <input
              className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
              placeholder="Enter prompt here!"
              type="text"
              value={gpt}
              onChange={(e) => setGpt(e.target.value)}
            />
            <div className="m-2 text-secondary font-bold text-xs">
              {' '}
              Try "Write a post for selling iphone 14 used 6 months in 50 words"
              <div className="w-fit p-[0.1px] border-[1px] border-primary mt-1">
                <div
                  className="border-2 px-5 hover:cursor-pointer hover:text-white hover:bg-secondary border-secondary m-1 p-1 text-secondary placeholder-gray-400 w-fit "
                  onClick={handleGpt}
                >
                  {' '}
                  Ask AI
                </div>
              </div>
            </div>
          </div>
        )}
        {showGpt && useAi && gpt !== '' && <Gpt content={gpt} />}
        <div className="flex items-center w-full ">
          <input
            required
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
            value={productData?.category}
            placeholder="choose category"
          />
          {showOption ? (
            <IoMdArrowDropupCircle
              className="text-3xl hover:cursor-pointer text-secondary"
              onClick={selectOption}
            />
          ) : (
            <IoMdArrowDropdownCircle
              className="text-3xl hover:cursor-pointer  text-secondary"
              onClick={selectOption}
            />
          )}
        </div>
        {showOption && (
          <select
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
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
            <option onClick={selectOption} value="Induction or Kettle">
              Induction or Kettle
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
          className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
          required
        >
          {!productData?.photos && (
            <label
              className=" rounded-2xl m-2 p-1 text-secondary placeholder-secondary w-full "
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
        <div className="border-2 border-secondary p-1 bg-transparent my-2">
          <input
            className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
            type="submit"
            value={'Add'}
          />
        </div>
      </form>

      {error?.isError && <Error error={error?.error} />}
    </div>
  )
}

export default AddProducts
