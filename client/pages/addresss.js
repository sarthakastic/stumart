import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAddress, getAddress } from '../slices/addressSlice'
import addressIcon from '../public/address.png'

import Button from '../components/PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'

const addresss = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [user, setUser] = useState()

  const [showHostel, setShowHostel] = useState(false)
  const [showFloor, setShowFloor] = useState(false)
  const [address, setAddress] = useState([])

  const selectHostel = () => {
    setShowHostel((option) => !option)
  }

  const selectFloor = () => {
    setShowFloor((option) => !option)
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
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

  const [productData, setProductData] = useState({
    hostel: '',
    room: NaN,
    floor: '',
  })

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setProductData({
      hostel: '',
      room: NaN,
      floor: '',
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(
      addAddress({
        ...productData,
        name: user?.result?.name,
        contact: user?.result?.phoneNumber,
      })
    ).then(router.push('/'))
    clear()
  }
  const register = () => {
    router.push('/register')
  }

  const home = () => {
    router.push('/')
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

  if (address?.name) {
    return home()
  }

  return (
    <div className="flex">
      <div className="w-1/2 min-h-[920px] hidden h-screen bg-gray-400 md:flex justify-center items-center ">
        <img className="h-3/4" src={addressIcon.src} />
      </div>
      <div className="md:w-1/2 w-screen md:min-h-[920px]  bg-gray-400 min-h-screen h-fit md:h-screen p-2 flex flex-col items-center justify-center ">
        <div className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          <h1>Add your Hostel Address!</h1>
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col  shadow-[rgba(1,_7,_5,_0.2)_0px_60px_40px_-7px]  ">
          <form
            className="flex flex-col items-center  "
            onSubmit={handleSubmit}
          >
            <div className="flex items-center w-full m-2">
              <input
                className="border-2 border-gray-400 rounded-2xl  p-1 text-gray-400 placeholder-gray-400 w-full "
                value={productData.hostel}
                placeholder="choose hostel"
                required
              />
              {showHostel ? (
                <IoMdArrowDropupCircle
                  className="text-3xl hover:cursor-pointer text-gray-400"
                  onClick={selectHostel}
                />
              ) : (
                <IoMdArrowDropdownCircle
                  className="text-3xl hover:cursor-pointer  text-gray-400"
                  onClick={selectHostel}
                />
              )}
            </div>
            {showHostel && (
              <select
                className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
                name="hostel"
                required
                size="3"
                onChange={handleChange}
              >
                <option onClick={selectHostel} value="Maharishi Valmiki">
                  Maharishi Valmiki
                </option>
                <option onClick={selectHostel} className="" value="Rahim">
                  Rahim
                </option>
                <option onClick={selectHostel} value="Munshi Prem Chand">
                  Munshi Prem Chand
                </option>
                <option onClick={selectHostel} value="Malik Mohammad">
                  Malik Mohammad
                </option>
                <option onClick={selectHostel} value="Ravidas">
                  Ravidas
                </option>
                <option onClick={selectHostel} value="Kabirdas">
                  Kabirdas
                </option>
                <option onClick={selectHostel} value="Tulsidas">
                  Tulsidas
                </option>
                <option onClick={selectHostel} value="Ghasidas">
                  Ghasidas
                </option>
                <option onClick={selectHostel} value="Birsa Munda">
                  Birsa Munda
                </option>
                <option onClick={selectHostel} value="Ismat Chugtai">
                  Ismat Chugtai
                </option>
                <option onClick={selectHostel} value="Ram Sharandas">
                  Ram Sharandas
                </option>
                <option onClick={selectHostel} value="Narayan Guru">
                  Narayan Guru
                </option>
                <option onClick={selectHostel} value="Ghasidas">
                  Ghasidas
                </option>
                <option onClick={selectHostel} value="Ghasidas">
                  Ghasidas
                </option>
              </select>
            )}
            <div className="flex items-center w-full m-2 ">
              <input
                className="border-2 border-gray-400 rounded-2xl  p-1 text-gray-400 placeholder-gray-400 w-full "
                value={productData.floor}
                placeholder="choose floor"
                required
              />

              {showFloor ? (
                <IoMdArrowDropupCircle
                  className="text-3xl hover:cursor-pointer text-gray-400"
                  onClick={selectFloor}
                />
              ) : (
                <IoMdArrowDropdownCircle
                  className="text-3xl hover:cursor-pointer  text-gray-400"
                  onClick={selectFloor}
                />
              )}
            </div>
            {showFloor && (
              <select
                className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
                name="floor"
                required
                size="3"
                onChange={handleChange}
              >
                <option onClick={selectFloor} value="Ground">
                  Ground
                </option>
                <option onClick={selectFloor} className="" value="First">
                  First
                </option>
                <option onClick={selectFloor} value="Second">
                  Second
                </option>
                <option onClick={selectFloor} value="Third">
                  Third
                </option>
              </select>
            )}
            <input
              type="number"
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              min="1"
              max="152"
              name="room"
              required
              onChange={handleChange}
              placeholder="Room Number"
            />
            <input
              className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-500 rounded-2xl hover:text-gray-200 hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
              type="submit"
              value="Add"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default addresss
