import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  signin,
  signup,
  getUserInfo,
  validateUser,
  validateEditPassword,
} from '../../slices/authSlice'
import { setError } from '../../slices/errorSlice'
import FileBase from 'react-file-base64'
import * as api from '../../api'
import Error from '../Error'
import { auth } from '../Firebase/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

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

  const [otp, setOtp] = useState(false)
  const [otpValue, setOtpValue] = useState(NaN)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [resendOtp, setResendOtp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignUp = () => {
    console.log(formData, 'formdata')
    dispatch(validateUser(formData)).then(
      (res) => res?.payload?.status == 200 && handleOtp()
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const storedData = JSON.parse(localStorage.getItem('profile'))

    if (storedData) {
      storedData.result.name = formData?.firstName + ' ' + formData?.lastName
      storedData.result.selectedFile = formData?.selectedFile
    }
    const updateProfileLocalStorage = () => {
      localStorage.setItem('profile', JSON.stringify(storedData))
      router.reload()
    }

    props?.editUserInfo &&
      api
        .editProfile(user?.result?._id, formData)
        .then(updateProfileLocalStorage)

    isSignUp && !props?.editUserInfo && (await handleSignUp())

    !isSignUp &&
      !props?.editUserInfo &&
      (await dispatch(signin(formData)).then(!error && router.push('/')))
  }

  const onCaptchaVerify = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            onSignUp()
          },
          'expired-callback': () => {},
        },
        auth
      )
    }
  }

  const handleOtp = () => {
    onSignUp()
    setOtp(true)
  }

  const handleEditOtp = (e) => {
    if (e) {
      e.preventDefault()
    }
    dispatch(validateEditPassword(formData)).then(
      (res) => res?.payload?.status == 200 && onSignUp()
    )

    setResendOtp(true)
  }

  const onSignUp = async (e) => {
    if (e) {
      e.preventDefault()
    }
    onCaptchaVerify()

    // setOtp(true)
    const appVerifier = window.recaptchaVerifier

    const ph = `+91${formData?.phoneNumber}`
    await signInWithPhoneNumber(auth, ph, appVerifier)
      .then((confirmationResult) => {
        console.log('first')
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        // ...
      })
      .catch((error) => {
        console.log(error, 'otp error')
        // Error; SMS not sent
        // ...
      })
  }

  const verifyOtp = (e) => {
    if (e) {
      e.preventDefault()
    }
    window.confirmationResult
      .confirm(otpValue)
      .then(async (res) => {
        ;(await forgotPassword)
          ? setEditPassword(true)
          : dispatch(signup(formData)).then(!error && router.push('/'))
      })
      .catch((err) => dispatch(setError(err?.message.slice(22, 47))))
    setOtpValue(NaN)
    setOtp(false)
  }

  const updatePassword = (e) => {
    if (e) {
      e.preventDefault()
    }

    api
      .updatePassword(formData?.phoneNumber, { password: formData?.password })
      .then(router.push('/'))
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
      {forgotPassword ? (
        <h4 className="text-2xl m-auto  text-center my-4 font-montserrat font-bold text-secondary ">
          Edit Password!
        </h4>
      ) : (
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
      )}
      <div id="recaptcha-container"></div>
      {forgotPassword ? (
        <>
          {editPassword ? (
            <>
              <form
                className="flex flex-col w-full items-start bg-white"
                onSubmit={updatePassword}
              >
                <input
                  className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  onChange={handleChange}
                  placeholder="New Password"
                />
                <p onClick={() => setShowPassword((prev) => !prev)}>
                  {' '}
                  {showPassword ? (
                    <BsFillEyeSlashFill className="text-secondary hover:cursor-pointer text-2xl " />
                  ) : (
                    <BsFillEyeFill className="text-secondary hover:cursor-pointer  text-2xl " />
                  )}
                </p>
                <div className="border-2 border-secondary p-1 bg-transparent my-2">
                  <input
                    className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
                    type="submit"
                    value={'Edit'}
                  />
                </div>
              </form>
            </>
          ) : (
            <>
              <form
                onSubmit={handleEditOtp}
                className="flex flex-col w-full items-start bg-white  "
              >
                <input
                  className=" outline-transparent w-3/4 border-b-2 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                  name="phoneNumber"
                  onChange={handleChange}
                  required
                  min={5555555555}
                  max={9999999999}
                  placeholder="Phone Number"
                  type="number"
                />
                {resendOtp ? (
                  <p
                    onClick={onSignUp}
                    className="text-secondary pl-5 hover:underline decoration-secondary hover:cursor-pointer "
                  >
                    resend OTP
                  </p>
                ) : (
                  <div className="border-2 border-secondary p-1 bg-transparent my-2">
                    <input
                      className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
                      type="submit"
                      value={'Send OTP'}
                    />
                  </div>
                )}
              </form>
              <input
                className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                type="number"
                placeholder="Enter OTP"
                name="otp"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />
              <div className="border-2 border-secondary p-1 bg-transparent my-2">
                <div
                  className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
                  onClick={verifyOtp}
                >
                  Validate OTP
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
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
              <div className="flex items-center ">
                <input
                  className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  onChange={handleChange}
                  placeholder="Password"
                />
                <p onClick={() => setShowPassword((prev) => !prev)}>
                  {' '}
                  {showPassword ? (
                    <BsFillEyeSlashFill className="text-secondary hover:cursor-pointer text-2xl " />
                  ) : (
                    <BsFillEyeFill className="text-secondary hover:cursor-pointer  text-2xl " />
                  )}
                </p>
              </div>
            )}

            {isSignUp && (
              <div className="flex flex-col items-start ">
                {!props?.editUserInfo && (
                  <input
                    className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                    required
                    type={showPassword ? 'text' : 'password'}
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
                <span className="text-secondary">
                  <input className=" my-2  " type="checkbox" required />
                  &nbsp; I agree to &nbsp;
                  <a
                    className="hover:cursor-pointer underline "
                    href="/termsAndConditions"
                  >
                    Terms and Conditions
                  </a>
                </span>
              </div>
            )}
            <p className="text-red-500">{error?.isError && error.error}</p>
            {otp ? (
              <>
                <input
                  className=" outline-transparent border-b-2 w-3/4 my-2 placeholder-secondary border-secondary text-secondary caret-secondary  "
                  type="number"
                  placeholder="Enter OTP"
                  name="otp"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                />
                <div className="flex items-center  ">
                  <div className="border-2 border-secondary p-1 bg-transparent my-2">
                    <div
                      className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
                      onClick={verifyOtp}
                    >
                      Validate OTP
                    </div>
                  </div>
                  <p
                    onClick={onSignUp}
                    className="text-secondary pl-5 hover:underline decoration-secondary hover:cursor-pointer "
                  >
                    resend OTP
                  </p>
                </div>
              </>
            ) : (
              <div className="border-2 border-secondary p-1 bg-transparent my-2">
                <input
                  className=" h-fit w-fit bg-secondary  py-1 px-4 md:mx-1  hover:cursor-pointer text-white "
                  type="submit"
                  value={
                    props?.edit ? 'Edit' : isSignUp ? 'Sign Up' : 'Sign In'
                  }
                />
              </div>
            )}
          </form>
        </>
      )}
      {!isSignUp && !forgotPassword && (
        <div
          onClick={() => setForgotPassword((prev) => !prev)}
          className="text-secondary decoration-secondary hover:underline hover:cursor-pointer "
        >
          Forgot Password
        </div>
      )}
      {!forgotPassword && (
        <div className="bg-white  p-4 flex flex-col   ">
          <div className="flex justify-start items-start ">
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
      )}

      {error?.isError && <Error error={error?.error} />}
    </div>
  )
}

export default UserInfo
