import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { signin, signup, getUserInfo } from '../../slices/authSlice'
import { closeError } from '../../slices/errorSlice'
import FileBase from 'react-file-base64'
import * as api from '../../api'
import Error from '../Error'

const UserInfo = (props) => {
  const { isSignUp } = props
  const error = useSelector((state) => state?.error)

  const initialState = {
    firstName: '',
    lastName: '',
    selectedFile: '',
    password: '',
    phoneNumber: NaN,
  }

  const dispatch = useDispatch()

  const router = useRouter()

  const [formData, setFormData] = useState(initialState)

  const [user, setUser] = useState()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    props?.editUserInfo && api.editProfile(user?.result?._id, formData)
    // .then(
    //   (user?.result?.name = `${formData?.firstName} ${formData?.lastName}`)(
    //     (user?.result?.selectedFile = `${formData?.selectedFile}`)
    //   )
    // )

    isSignUp &&
      !props?.editUserInfo &&
      dispatch(signup(formData)).then(router.push('/'))

    !isSignUp &&
      !props?.editUserInfo &&
      dispatch(signin(formData)).then(router.push('/'))
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

  if (user?.result?.name && !props?.editUserInfo) {
    router.push('/')
  }

  return (
    <div>
      {error?.isError && <Error error={error?.error} />}
      <form
        className="flex flex-col items-center bg-white  "
        onSubmit={onSubmit}
      >
        {console.log(formData, 'formdata')}
        {isSignUp && (
          <>
            <input
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              type="text"
              name="firstName"
              value={formData?.firstName}
              required
              onChange={handleChange}
              placeholder="First Name"
            />

            <input
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
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
            className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full  w-full "
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
            className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="Password"
          />
        )}

        {isSignUp && (
          <div className="flex flex-col items-center ">
            {!props?.editUserInfo && (
              <input
                className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
                required
                type="text"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            )}
            <div
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              required
            >
              {!formData?.selectedFile && (
                <label
                  className=" rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
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
        <input
          className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-500 rounded-2xl hover:text-gray-200 hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
          type="submit"
          value={isSignUp ? 'Sign Up' : 'Sign In'}
        />
      </form>
    </div>
  )
}

export default UserInfo
