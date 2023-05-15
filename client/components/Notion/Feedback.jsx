// Native Imports
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

// Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// Slice Imports
import { closeError } from '../../slices/errorSlice'
import { addFeedback } from '../../slices/feedbackSlice'

// Components Imports
import Button from '../PredDefinedComponents/Button'

const Feedback = () => {
  const dispatch = useDispatch()

  const error = useSelector((state) => state?.error) // get the error from redux store

  const router = useRouter()

  const [user, setUser] = useState() // set the user data from local storage

  // initialise formData value to be filled in feedback api
  const [formData, setFormData] = useState({
    feedback: '',
    contact: NaN,
    creator: '',
  })

  /* This code is using the `useEffect` hook to retrieve the user data from local storage and set it to
 the `user` state variable. It runs only once when the component mounts, as the dependency array
 `[]` is empty. The `localStorage.getItem('profile')` method retrieves the value of the 'profile'
 key from the local storage, and the `JSON.parse(storedProfile)` method parses the retrieved value
 from a string to a JavaScript object. If there is no value for the 'profile' key in the local
 storage, the `initialUser` variable is set to `null`. Finally, the `setUser(initialUser)` method
 sets the `user` state variable to the retrieved user data or `null`. */
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /**
   * The "clear" function sets the state of "formData" to empty values.
   */
  const clear = () => {
    setFormData({ feedback: '', contact: NaN, creator: '' })
  }

  /**
   * The function handleClose dispatches a closeError action and clears some data.
   */
  const handleClose = () => {
    dispatch(closeError())
    clear()
  }

  // Feedback is submitted using addFeedback slice
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
          <div className="m-1 flex flex-col md:flex-row items-center text-xs justify-between ">
            <p className="text-secondary p-1 ">
              Please Sign Up/ Sign In to add your Feedback
            </p>
            <Button
              content="Sign Up/Sign In"
              onClick={() => router.push('/register')}
            />
          </div>
        )}
      </form>
      {console.log(error?.error, 'cvhcvjhdciudscik')}
      {error?.isError && (
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
