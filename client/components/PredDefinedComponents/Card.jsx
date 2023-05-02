import React, { useState, useEffect } from 'react'
import Button from './Button'
import { getAddress } from '../../slices/addressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Product from '../../pages/product'
import { AiFillEdit } from 'react-icons/Ai'
import { ImCross } from 'react-icons/Im'
import { MdDelete } from 'react-icons/Md'
import * as api from '../../api/index'
import AddProducts from '../Products/AddProducts'

const Card = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const id = router?.query?.id

  const [address, setAddress] = useState([])
  const [user, setUser] = useState()
  const [productId, setProductId] = useState('')
  const [edit, setEdit] = useState(false)

  const creator = props.creator
  const currentRoute = router.pathname

  useEffect(() => {
    // Make sure `props.creator` is a valid string value
    if (props.creator) {
      // Dispatch the getAddress action with `props.creator` as an argument
      dispatch(getAddress(creator))
        .then((response) => {
          const address = response?.payload
          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [props.creator])

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  const handleEdit = (id) => {
    setProductId(id)
    setEdit((edit) => !edit)
  }

  const deleteProduct = (id) => {
    api.deleteProduct(id).then(router.push('/'))
  }

  const productDetails = () => {
    router.push(`/product/${props?.id}`)
  }

  return (
    <>
      {edit && (
        <div className="fixed inset-0 z-10  bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center ">
          <div
            onClick={handleEdit}
            className="text-2xl flex items-start bg-red-400 hover:text-white hover:cursor-pointer hover:bg-gray-700 rounded-full p-1 border-2 border-gray-700 "
          >
            <ImCross />
          </div>
          <h2 className=" text-gray-700 font-bold ">Edit Product!</h2>
          <div className="h-1/2 w-1/2 ">
            <AddProducts id={props?.id} />
          </div>
        </div>
      )}
      <div className="rounded-2xl w-72 h-fit pb-2 m-5 border-2 border-primary bg-white ">
        <img
          className="w-72 h-40 rounded-t-2xl "
          src={props?.photos}
          alt="product image"
        />
        <div className="flex flex-col justify-evenly px-2">
          <p className="text-2xl  "> {props?.name}</p>
          <p className="px-2"> Rs.{props?.price}/-</p>

          {address && (
            <>
              <p className="px-2"> {address?.name} </p>
              <p className="px-2">{address?.hostel} </p>
            </>
          )}

          <div className=" justify-between items-center text-xs ">
            <p className=" h-fit w-fit  py-1 px-4 md:mx-1 shadow-md rounded-2xl text-white bg-primary  ">
              {props?.tag}
            </p>
            {props?.status ? (
              <div className="bg-gradient-to-bl pt-2 from-secondary via-primary to-ternary flex justify-center rounded-lg text-white  text-sm bg-clip-content w-28 ">
                Sold
              </div>
            ) : (
              <p
                className="py-1 text-primary hover:underline decoration-primary hover:cursor-pointer px-4 "
                onClick={productDetails}
              >
                View more details
              </p>
            )}
          </div>
          <div className="flex justify-around mt-1">
            {user?.result?._id === creator &&
              id &&
              currentRoute.includes('myProfile') && (
                <>
                  {!props?.status && (
                    <AiFillEdit
                      onClick={handleEdit}
                      className="text-2xl hover:text-white hover:cursor-pointer hover:bg-primary text-primary rounded-full p-1 border-2 border-primary "
                    />
                  )}

                  {!props?.status && (
                    <MdDelete
                      onClick={() => deleteProduct(props?.id)}
                      className="text-2xl hover:text-white hover:cursor-pointer text-red-700 hover:bg-red-700  rounded-full p-1 border-2 border-red-700 "
                    />
                  )}

                  {props?.status ? (
                    <div
                      className="text-primary hover:underline decoration-primary "
                      onClick={() =>
                        api
                          .updateProduct(props?.id, { productStatus: false })
                          .then(router.reload())
                      }
                    >
                      {router.pathname.includes('myProfile') &&
                        'Mark as unsold'}
                    </div>
                  ) : (
                    <div
                      className="text-primary hover:underline decoration-primary "
                      onClick={() =>
                        api
                          .updateProduct(props?.id, { productStatus: true })
                          .then(router.reload())
                      }
                    >
                      {router.pathname.includes('myProfile') && 'Mark as sold'}
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
