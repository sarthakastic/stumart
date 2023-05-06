import { Router } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as api from '../../api'
import { closeError } from '../../slices/errorSlice'
import { addFeedback } from '../../slices/feedbackSlice'
import Button from '../PredDefinedComponents/Button'
import { useRouter } from 'next/router'

const Feedback = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state?.error)
  const router = useRouter()

  const [user, setUser] = useState()
  const [formData, setFormData] = useState({
    feedback: '',
    contact: NaN,
    creator: '',
  })

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const clear = () => {
    setFormData({ feedback: '', contact: NaN, creator: '' })
  }

  const handleClose = () => {
    dispatch(closeError())
    clear()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await dispatch(
      addFeedback({
        ...formData,
        name: user?.result?.name,
        contact: user?.result?.phoneNumber,
      })
    )
  }

  return (
    <div
      id="feedback"
      className="rounded-xl border-2 border-primary w-full h-full "
    >
      <h1 className="font-bold font-montserrat text-xl md:text-5xl w-full flex justify-start p-5 text-white  drop-shadow-[0_2.5px_2.5px_rgba(240,120,120,1)]">
        Add your suggestions or feedbacks...
      </h1>
      <form className="px-5 " onSubmit={handleSubmit}>
        <textarea
          required
          name="feedback"
          onChange={handleChange}
          rows={10}
          className="border-1 rounded-xl p-2 text-primary outline-primary border-primary w-full h-full"
          placeholder="Write your suggestions or feedbacks..."
        />
        {user?.result?.name ? (
          <div className="bg-transparent border-2 border-secondary my-2 p-2 h-full  ">
            <input
              type="submit"
              className="bg-secondary w-full text-white font-bold hover:cursor-pointer "
              value={'Add Feedback'}
            />
          </div>
        ) : (
          <div className="m-1">
            <Button
              content="Sign Up/Sign In"
              onClick={() => router.push('/register')}
            />
          </div>
        )}
      </form>
      {console.log(error?.error, 'cvhcvjhdciudscik')}
      {error?.isError && error?.error === '' && (
        <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
          <div className="w-3/4 h-1/2 bg-white flex flex-col rounded-xl items-center justify-center ">
            <p className="font-montserrat font-bold text-primary">
              Feedback Submitted!
            </p>
            <br />
            <p className="font-montserrat font-bold text-primary">
              Thanks for the feedback.
            </p>
            <br />
            <Button content={'close'} onClick={handleClose} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Feedback
