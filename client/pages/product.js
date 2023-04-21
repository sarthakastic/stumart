import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FileBase from 'react-file-base64'
import { createProducts } from '../slices/productSlice'
import { getAddress } from '../slices/addressSlice'
import Button from '../components/PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'
import { BiLocationPlus } from 'react-icons/Bi'
const product = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [user, setUser] = useState()
  const [address, setAddress] = useState([])
  const [showOption, setShowOPtion] = useState(false)

  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  )

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
    if (post) setPostData(post)
  }, [post])

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

    if (currentId === 0) {
      dispatch(
        createProducts({ ...productData, name: user?.result?.name })
      ).then(router.push('/'))
      clear()
    } else {
      //   dispatch(
      //     updatePost(currentId, { ...postData, name: user?.result?.name })
      //   );
      clear()
    }
  }

  const clear = () => {
    setCurrentId(null)
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

  const register = () => {
    router.push('/register')
  }

  const addressPath = () => {
    router.push('/addresss')
  }

  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-gray-500 flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          Please Sign In before adding your address.
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
      <div className="h-screen bg-gray-500 flex flex-col justify-center items-center">
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
    <div className=" bg-gray-400 min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col md:w-1/2 items-center justify-center bg-white p-5 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="text"
          name="title"
          required
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="number"
          name="cost"
          required
          onChange={handleChange}
          placeholder="Cost"
        />
        <textarea
          className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
          type="text"
          name="details"
          required
          onChange={handleChange}
          placeholder="Details"
        />
        <div className="flex items-center w-full ">
          <input
            required
            className="border-2 border-gray-400 rounded-2xl  p-1 text-gray-400 placeholder-gray-400 w-full "
            value={productData.category}
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
            size="3"
            onChange={handleChange}
          >
            <option value="volvo">Volvo</option>
            <option className="" value="saab">
              Saab
            </option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
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

export default product
