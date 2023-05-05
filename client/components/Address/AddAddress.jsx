import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAddress, getAddress } from '../../slices/addressSlice'
import addressIcon from '../../public/address.svg'

import Button from '../PredDefinedComponents/Button'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/Io'
import { FiLogIn } from 'react-icons/Fi'
import { updateAddress } from '../../api'

import registerIcon from '../../public/register.png'

const AddAddress = (props) => {
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

          setProductData(address)
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
    _id: '',
  })

  /**
   * The handleChange function updates the state of productData with the new value of the input field
   * that triggered the onChange event.
   */
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  /**
   * The "clear" function sets the "productData" state to default values.
   */
  const clear = () => {
    setProductData({
      hostel: '',
      room: NaN,
      floor: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Dispatch the appropriate action based on whether editUserInfo is true or false
      if (props?.editUserInfo) {
        await updateAddress(productData?._id, {
          ...productData,
          name: user?.result?.name,
          contact: user?.result?.phoneNumber,
        }).then(router.push('/'))
      } else {
        await dispatch(
          addAddress({
            ...productData,
            name: user?.result?.name,
            contact: user?.result?.phoneNumber,
          })
        )
      }

      router.push('/')
      clear()
    } catch (error) {
      // Handle error
      console.log(error)
    }
  }

  const register = () => {
    router.push('/register')
  }

  const home = () => {
    router.push('/')
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

  if (address?.name && !props?.editUserInfo) {
    return home()
  }

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col  shadow-[rgba(1,_7,_5,_0.2)_0px_60px_40px_-7px]  ">
      <h4 className="text-2xl flex justify-center items-center text-center my-4 font-montserrat font-bold text-secondary ">
        Add your Hostel Address!
      </h4>
      <form
        className="flex flex-col items-center  justify-start"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center w-full m-2">
          <input
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
            value={productData?.hostel}
            placeholder="choose hostel"
            required
          />
          {showHostel ? (
            <IoMdArrowDropupCircle
              className="text-3xl hover:cursor-pointer text-ternary"
              onClick={selectHostel}
            />
          ) : (
            <IoMdArrowDropdownCircle
              className="text-3xl hover:cursor-pointer  text-ternary"
              onClick={selectHostel}
            />
          )}
        </div>
        {showHostel && (
          <select
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
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
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
            value={productData?.floor}
            placeholder="choose floor"
            required
          />

          {showFloor ? (
            <IoMdArrowDropupCircle
              className="text-3xl hover:cursor-pointer text-ternary"
              onClick={selectFloor}
            />
          ) : (
            <IoMdArrowDropdownCircle
              className="text-3xl hover:cursor-pointer  text-ternary"
              onClick={selectFloor}
            />
          )}
        </div>
        {showFloor && (
          <select
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
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
          className=" outline-transparent flex justify-start border-b-2 w-full my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
          min="1"
          max="152"
          name="room"
          value={productData?.room}
          required
          onChange={handleChange}
          placeholder="Room Number"
        />
        <div className="border-2 border-secondary p-1 bg-transparent my-2">
          <input
            className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
            type="submit"
            value={'Add'}
          />
        </div>
      </form>
    </div>
  )
}

export default AddAddress
