import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { signin, signup, getUserInfo } from '../../slices/authSlice'
import { closeError } from '../../slices/errorSlice'
import FileBase from 'react-file-base64'
import * as api from '../../api'
import Error from '../Error'
import Button from '../PredDefinedComponents/Button'

const UserInfo = (props) => {
  const [isSignUp, setIsSignUp] = useState(true)

  const toggleAuth = () => {
    setIsSignUp((prevAuth) => !prevAuth)
  }
  const error = useSelector((state) => state?.error)

  const initialState = {
    firstName: '',
    lastName: '',
    selectedFile: '',
    password: '',
    phoneNumber: NaN,
  }
  const authData = useSelector((state) => state?.auth?.authData) // set authdata on sign in/sign up to fetch profile pic in navbar on each change
  console.log(authData, 'authData')

  const dispatch = useDispatch()

  const router = useRouter()

  const [formData, setFormData] = useState(initialState)

  const [user, setUser] = useState()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const storedData = JSON.parse(localStorage.getItem('profile'))

    storedData.result.name = formData?.firstName + ' ' + formData?.lastName
    storedData.result.selectedFile = formData?.selectedFile

    const updateProfileLocalStorage = () => {
      localStorage.setItem('profile', JSON.stringify(storedData))
      router.reload()
    }

    props?.editUserInfo &&
      api
        .editProfile(user?.result?._id, formData)
        .then(updateProfileLocalStorage)

    isSignUp &&
      !props?.editUserInfo &&
      (await dispatch(signup(formData)).then(!error && router.push('/')))

    !isSignUp &&
      !props?.editUserInfo &&
      (await dispatch(signin(formData)).then(!error && router.push('/')))
  }

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getUserInfo(user?.result?._id))
        .then((response) => {
          const userInfo = response?.payload
          console.log(userInfo?.name?.split(' ')[0])
          setFormData({
            firstName: userInfo?.name?.split(' ')[0],
            lastName: userInfo?.name?.split(' ')[1],
            selectedFile: userInfo?.selectedFile,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [user])

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  useEffect(() => {
    if (authData && !props?.editUserInfo) {
      router.push('/')
    }
  }, [authData])

  return (
    <div className="bg-white min-w-fit flex flex-col justify-center items-start p-5 rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] min-h-fit h-4/5 md:h-4/6 md:w-1/2 ">
      <div className="text-2xl flex justify-center items-center text-center my-4 font-montserrat font-bold text-secondary ">
        {!props?.edit &&
          (isSignUp ? (
            <h4>
              Hey, it's always good
              <br /> to see new beautiful faces!
            </h4>
          ) : (
            <h4>
              Hey, it's always good to
              <br /> see beautiful faces once again!
            </h4>
          ))}
      </div>
      <div className="text-2xl w-full flex justify-center items-center text-center my-4 font-montserrat font-bold text-secondary ">
        {props?.edit && <h4>Edit your Profile!</h4>}
      </div>
      <form
        className="flex flex-col items-start bg-white  "
        onSubmit={onSubmit}
      >
        {console.log(formData, 'formdata')}
        {isSignUp && (
          <>
            <input
              className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
              type="text"
              name="firstName"
              value={formData?.firstName}
              required
              onChange={handleChange}
              placeholder="First Name"
            />

            <input
              className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
              type="text"
              onChange={handleChange}
              required
              name="lastName"
              value={formData?.lastName}
              placeholder="Last Name"
            />
          </>
        )}
        {!props?.editUserInfo && (
          <input
            className=" outline-transparent w-3/4 border-b-2 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
            name="phoneNumber"
            onChange={handleChange}
            required
            value={formData?.phoneNumber}
            min={5555555555}
            max={9999999999}
            placeholder="Phone Number"
            type="number"
          />
        )}
        {!props?.editUserInfo && (
          <input
            className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="Password"
          />
        )}

        {isSignUp && (
          <div className="flex flex-col items-start ">
            {!props?.editUserInfo && (
              <input
                className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                required
                type="text"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            )}
            <div
              className=" outline-transparent border-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
              required
            >
              {!formData?.selectedFile && (
                <label
                  className=" rounded-2xl m-2 p-1 placeholder-secondary  text-secondary w-full "
                  required
                >
                  Profile picture (JPEG,PNG)
                </label>
              )}
              <input
                className="w-1 h-1"
                value={formData?.selectedFile || initialState?.selectedFile}
                required
              ></input>
              {formData?.selectedFile && (
                <img
                  required
                  className=" rounded-full w-14 h-14  "
                  src={formData?.selectedFile}
                />
              )}{' '}
            </div>
            <FileBase
              required
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, selectedFile: base64 })
              }
              accept="image/png,image/jpeg"
            />
          </div>
        )}
        <p className="text-red-500">{error?.isError && error.error}</p>
        <div className="border-2 border-secondary p-1 bg-transparent my-2">
          <input
            className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
            type="submit"
            value={props?.edit ? 'Edit' : isSignUp ? 'Sign Up' : 'Sign In'}
          />
        </div>
      </form>
      <div className="bg-white  p-4 flex flex-col   ">
        <div className="flex justify-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          {isSignUp ? (
            <p
              className="text-secondary ml-2 font-light hover:cursor-pointer decoration-primary hover:underline "
              onClick={toggleAuth}
            >
              Sign In
            </p>
          ) : (
            <p
              className="text-secondary font-light ml-2 hover:cursor-pointer decoration-primary hover:underline "
              onClick={toggleAuth}
            >
              Sign Up
            </p>
          )}
        </div>
      </div>
      {error?.isError && <Error error={error?.error} />}
    </div>
  )
}

export default UserInfo
