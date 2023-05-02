// Native Imports
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux Imports
import { getUserProduct } from '../../slices/productSlice'
import { getAddress } from '../../slices/addressSlice'
import { logout } from '../../slices/authSlice'

// Components Imports
import Card from '../../components/PredDefinedComponents/Card'
import AddAddress from '../../components/Address/AddAddress'
import UserInfo from '../../components/UserInfo/UserInfo'
import Button from '../../components/PredDefinedComponents/Button'
import NoPosts from '../../components/PredDefinedComponents/NoPosts'

// Icons Imports
import { ImCross } from 'react-icons/Im'
import { AiFillEdit } from 'react-icons/Ai'
import { BiLocationPlus } from 'react-icons/Bi'
import { FiLogIn } from 'react-icons/Fi'

const MyProfile = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const data = useSelector((state) => state?.posts)

  const error = useSelector((state) => state?.error)

  const [user, setUser] = useState() // set localstorage data

  const [postData, setPostData] = useState([]) // set user products

  const [address, setAddress] = useState([]) // set user address

  const [creator, setCreator] = useState('') // set user ID

  const [productId, setProductId] = useState('') // set product iD

  const [edit, setEdit] = useState(false) // check if we want to edit profile or not

  const [editAddress, setEditAddress] = useState(false) // check if we want to edit address or not

  const id = router.query.id

  // retrieve data from local storage
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  //  retrieve posts by user
  useEffect(() => {
    const page = 1
    dispatch(getUserProduct(user?.result?._id))
      .then((posts) => {
        setPostData(posts?.payload)
        setCreator(user?.result?._id)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [user])

  // retrieve user address
  useEffect(() => {
    creator &&
      dispatch(getAddress(creator))
        .then((response) => {
          const address = response?.payload
          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [creator])

  // used for logout
  const handleLogOut = () => {
    dispatch(logout()).then(router.push('/'))
  }

  // redirect to add products
  const addProduct = () => {
    router.push('/product')
  }

  // redirect to add address
  const addAddress = () => {
    router.push('/addresss')
  }

  // manage edit profile
  const handleEdit = (id) => {
    setProductId(id)
    setEdit((edit) => !edit)
  }

  //  manage edit address
  const handleAddressEdit = (id) => {
    setProductId(id)
    setEditAddress((editAddress) => !editAddress)
  }

  //  redirect to sign up/sign in
  const register = () => {
    router.push('/register')
  }

  // if user not login
  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-primary ">
          Please Sign In to view details.
        </h1>

        <Button
          content="Sign Up/Sign In"
          onClick={register}
          icon={<FiLogIn />}
        />
      </div>
    )
  }

  return (
    <div className={`py-20  min-h-screen bg-white `}>
      <div className="w-full px-10 flex justify-center md:justify-between ">
        {/* user all info div */}
        <div className="flex w-full flex-col md:flex-row bg-primary  p-5 md:justify-between justify-evenly ">
          {/* user info div */}
          <div className="flex flex-col w-full  items-center md:items-start ">
            <img className=" w-52 h-40" src={user?.result?.selectedFile} />
          </div>
          <div className="flex w-full flex-col items-center justify-center ">
            <p className="font-bold  text-white font-montserrat  ">
              {user?.result?.name}
            </p>
            <p className="font-bold text-white font-montserrat ">
              {user?.result?.phoneNumber}
            </p>
            {address?.hostel && (
              <div className="mt-2 flex flex-col items-center justify-center ">
                <p className="font-bold  text-white font-montserrat">
                  {address?.hostel} Hostel{' '}
                </p>
                <p className="font-bold  text-white font-montserrat">
                  {address?.floor} Floor{' '}
                </p>
                <p className="font-bold  text-white font-montserrat">
                  Room No. {address?.room}
                </p>
              </div>
            )}
          </div>

          {/* desktop view product stats */}
          <div className="w-full hidden md:flex justify-around items-center  ">
            <div className="flex flex-col justify-center items-center    ">
              <p className="font-bold text-white text-2xl "> Total Products</p>
              <p className="font-bold text-white text-2xl ">
                {' '}
                {postData?.length}
              </p>
              {/* </div>
            <div className="flex flex-col justify-center items-center  border-gray-700 border-2 p-2 rounded-2xl"> */}
              <p className="font-bold text-white text-2xl ">Sold Products</p>
              <p className="font-bold text-white text-2xl ">
                {' '}
                {postData?.filter((i) => i.productStatus === true).length}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col md:hidden justify-around items-center mt-5 ">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-white">Total Products</p>
              <p className="font-bold text-white"> {postData?.length}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-white"> Sold Products</p>
              <p className="font-bold text-white">
                {' '}
                {postData?.filter((i) => i.productStatus === true).length}
              </p>
            </div>
          </div>
          {/* address info */}
          <div className="flex w-full flex-col my-5 md:my-0 justify-center items-center md:items-end  ">
            <div className="flex flex-col ">
              {address?.hostel ? (
                <Button
                  onClick={handleAddressEdit}
                  content="Edit Address"
                  icon={<BiLocationPlus />}
                />
              ) : (
                <Button
                  content="Add Address"
                  onClick={addAddress}
                  icon={<BiLocationPlus />}
                />
              )}
              <span className="mt-2"></span>
              <Button
                onClick={handleEdit}
                content="Edit Profile"
                icon={<AiFillEdit />}
              />

              <span className="mt-2"></span>
              <Button
                content="Sign Out"
                onClick={handleLogOut}
                icon={<FiLogIn />}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  div to display uses's posts */}
      <div className="flex  flex-wrap justify-center md:justify-evenly p-5   ">
        {/* If there are no posts by users */}
        {postData?.length === 0 && (
          <NoPosts heading=" Oops! You haven't posted yet." />
        )}
        {/* User products */}
        {postData?.length > 0 && (
          <h1 className="font-bold text-sm md:text-4xl w-full flex text-center justify-start p-5 text-gray-700">
            My Products
          </h1>
        )}
        {postData.map((i) => (
          <Card
            key={i._id}
            price={i.cost}
            name={i.title}
            tag={i.category}
            photos={i.photos[0]}
            status={i.productStatus}
            creator={i.creator}
            id={i._id}
          />
        ))}
      </div>

      {/* edit user info */}
      {edit && (
        <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
          <div className=" bg-transparent flex  justify-center items-center ">
            <div className="">
              <UserInfo isSignUp={true} edit={true} editUserInfo={true} />
              <br />
              <Button content={'Close'} error={false} onClick={handleEdit} />
            </div>
          </div>
        </div>
      )}

      {/* edit address */}
      {editAddress && (
        <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
          <div className=" bg-transparent flex  justify-center items-center ">
            <div className="">
              <AddAddress id={user?.result?._id} editUserInfo={true} />
              <br />
              <Button
                content={'Close'}
                error={false}
                onClick={handleAddressEdit}
              />
            </div>
          </div>
        </div>
      )}
      {error?.isError && <Error error={error?.error} />}
    </div>
  )
}

export default MyProfile
