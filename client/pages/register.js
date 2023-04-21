import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { signin, signup } from '../slices/authSlice'
import FileBase from 'react-file-base64'
import Button from '../components/PredDefinedComponents/Button'
import registerIcon from '../public/register.png'

const register = () => {
  const [isSignUp, setIsSignUp] = useState(true)

  const toggleAuth = () => {
    setIsSignUp((prevAuth) => !prevAuth)
  }

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
    isSignUp
      ? dispatch(signup(formData)).then(router.push('/'))
      : dispatch(signin(formData)).then(router.push('/'))
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  if (user?.result?.name) {
    router.push('/')
  }

  return (
    <div className=" flex  ">
      <div className="w-1/2 min-h-[920px] h-screen hidden md:flex  bg-gray-400  justify-center items-center ">
        <img className="h-3/4" src={registerIcon.src} />
      </div>
      <div className="w-screen md:w-1/2 min-h-[920px]  bg-gray-400  h-screen p-2 flex flex-col items-center justify-center ">
        <div className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
          {isSignUp ? (
            <h1>
              Hey, it's always good
              <br /> to see new beautiful faces!
            </h1>
          ) : (
            <h1>
              Hey, it's always good to
              <br /> see beautiful faces once again!
            </h1>
          )}
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col  shadow-[rgba(1,_7,_5,_0.2)_0px_60px_40px_-7px]  ">
          <form className="flex flex-col items-center  " onSubmit={onSubmit}>
            {isSignUp && (
              <>
                <input
                  className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
                  type="text"
                  name="firstName"
                  // {...register('firstName')}
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
                  placeholder="Last Name"
                />
              </>
            )}
            <input
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full  w-full "
              name="phoneNumber"
              onChange={handleChange}
              required
              min={5555555555}
              max={9999999999}
              placeholder="Phone Number"
              type="number"
            />

            <input
              className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
            />

            {isSignUp && (
              <div className="flex flex-col items-center ">
                <input
                  className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full "
                  required
                  type="text"
                  name="confirmPassword"
                  // {...register('confirmPassword')}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
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
                    value={formData?.selectedFile}
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

            <input
              className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md shadow-gray-500 rounded-2xl hover:text-gray-200 hover:bg-gray-400 border-gray-400 text-gray-400 border-2 "
              type="submit"
              value={isSignUp ? 'Sign Up' : 'Sign In'}
            />
          </form>
          <div className="flex justify-center">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            {isSignUp ? (
              <Button content="Sign In" onClick={toggleAuth} />
            ) : (
              <Button content="Sign Up" onClick={toggleAuth} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default register
