// Native Imports
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux Imports
import { getProduct } from '../../slices/productSlice'
import { getAddress } from '../../slices/addressSlice'
import { searchProducts } from '../../slices/productSlice'

// Components Imports
import Button from '../../components/PredDefinedComponents/Button'
import Card from '../../components/PredDefinedComponents/Card'
import Loader from '../../components/PredDefinedComponents/Loader'

// Icons Imports
import { FiLogIn } from 'react-icons/Fi'

// Images Imports
import registerIcon from '../../public/register.png'

const Product = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const post = useSelector((posts) => posts?.posts?.posts)

  const load = useSelector((state) => state?.load?.isLoad)
  console.log(load, 'k')

  const error = useSelector((state) => state?.error?.isError)

  const [search, setSearchData] = useState('') // set serach as empty string

  const [category, setCategory] = useState('') // used to set category

  const [user, setUser] = useState() // used to set local storage info

  const [address, setAddress] = useState([]) // used to set address we get from api

  // initial state to save product details
  const [productData, setProductData] = useState({
    title: '',
    cost: NaN,
    details: '',
    photos: '',
    category: '',
    creator: '',
  })

  const { id } = router.query

  /* This `useEffect` hook is used to retrieve the user's profile information from the local storage and
 set it to the `user` state variable. It runs only once when the component mounts, as the dependency
 array is empty. If there is no profile information in the local storage, the `initialUser` variable
 is set to `null`. Otherwise, it is set to the parsed profile information. Finally, the `setUser`
 function is called to update the `user` state variable with the `initialUser` value. */
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

  /* This `useEffect` hook is used to fetch the details of a product with the given `id` from the server
 using the `getProduct` action creator from the `productSlice` slice. It runs whenever the `id`
 value changes. If the `getProduct` request is successful, the `product` data is extracted from the
 `response` object and set to the `productData` state variable using the `setProductData` function.
 If the request fails, the error is logged to the console. */
  useEffect(() => {
    id &&
      dispatch(getProduct(id))
        .then((response) => {
          const product = response?.payload

          setProductData(product)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [id])

  /* This `useEffect` hook is used to update the `category` state variable whenever the
  `productData.category` value changes. It runs whenever the `productData.category` value changes,
  as it is included in the dependency array. If the `productData.category` value is truthy, the
  `setCategory` function is called to update the `category` state variable with the
  `productData.category` value. Additionally, the current value of the `category` state variable is
  logged to the console. */
  useEffect(() => {
    productData?.category && setCategory(productData?.category)
    console.log(category, 'category')
  }, [productData?.category])

  /* This `useEffect` hook is used to dispatch the `searchProducts` action creator from the
 `productSlice` slice whenever the `category` state variable changes. It runs whenever the
 `category` value changes, as it is included in the dependency array. If the `category` value is
 truthy, the `searchProducts` action creator is dispatched with an object containing the `search`
 and `category` values as its payload. If the `category` value is falsy, the `searchProducts` action
 creator is not dispatched. The purpose of this hook is to search for products with the same
 category as the current product and display them as recommendations. */
  useEffect(() => {
    category !== '' && dispatch(searchProducts({ search, category }))
  }, [category])

  /* This `useEffect` hook is used to fetch the address of the creator of the current product from the
 server using the `getAddress` action creator from the `addressSlice` slice. It runs whenever the
 `productData` state variable changes. If the `productData.creator` value is truthy, the
 `getAddress` action creator is dispatched with the `productData.creator` value as its payload. If
 the request is successful, the `address` data is extracted from the `response` object and set to
 the `address` state variable using the `setAddress` function. If the request fails, the error is
 logged to the console. */
  useEffect(() => {
    productData?.creator !== '' &&
      dispatch(getAddress(productData?.creator))
        .then((response) => {
          const address = response?.payload

          setAddress(address)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [productData])

  /**
   * The function redirects the user to the registration page using the router.
   */
  const register = () => {
    router.push('/register')
  }

  // if user is not signed in
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

  return (
    <div className="flex flex-col justify-center items-center bg-white w-screen h-full  min-h-screen md:min-h-screen py-20 px-2 md:p-20">
      <div className=" w-full  m-5  flex flex-col md:flex-row  p-2  ">
        <div className="w-full md:w-1/2 bg-secondary p-5 h-[720px]">
          {/* Product Image div */}
          <div className="bg-transparent border-2 border-ternary h-full p-5 flex items-center justify-center">
            <img
              className="h-[600px] w-full "
              src={productData?.photos}
              alt="product image"
            />
          </div>
        </div>
        {/* Product Details div */}
        <div className="flex flex-col w-full max-h-[720px] md:w-1/2  bg-white border-secondary border-2 md:ml-1 p-5">
          <div className="border-2 border-secondary h-full p-5 font-montserrat text-primary ">
            <p className="px-2 ">
              {' '}
              <span className="font-bold"> Title : </span> <br />{' '}
              {productData?.title}
            </p>
            <p className="px-2">
              {' '}
              <span className="font-bold"> Price : </span> <br /> Rs.
              {productData?.cost}/-
            </p>
            <p className="px-2  ">
              {' '}
              <span className="font-bold"> Details : </span> <br />
              <p className="flex text-clip break-words break-all ">
                {productData?.details}
              </p>
            </p>

            <p className="  ">
              {' '}
              <span className="font-bold"> Category : </span> <br />{' '}
              {productData?.category}
            </p>
            {address && (
              <>
                <p className="px-2">
                  {' '}
                  <span className="font-bold"> Name : </span> <br />{' '}
                  {address?.name}{' '}
                </p>
                <p className="px-2">
                  {' '}
                  <span className="font-bold"> Hostel : </span> <br />
                  {address?.hostel}{' '}
                </p>
                <p className="px-2">
                  {' '}
                  <span className="font-bold"> Floor : </span> <br />{' '}
                  {address?.floor}{' '}
                </p>
                <p className="px-2">
                  {' '}
                  <span className="font-bold"> Room No. : </span> <br />{' '}
                  {address?.room}{' '}
                </p>
                <p className="px-2">
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Contact Number :{' '}
                  </span> <br /> {address?.contact}{' '}
                </p>
              </>
            )}
            <div className="flex justify-between items-center text-xs ">
              {productData?.status && (
                <div className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 flex justify-center rounded-lg text-white translate-y-10 bottom-10 text-xl bg-clip-content w-28 ">
                  Sold
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Recommended Products */}
      <h1 className="font-bold font-montserrat text-xl md:text-5xl w-full flex justify-start p-5 text-white  drop-shadow-[0_2.5px_2.5px_rgba(240,120,120,1)]">
        Recommended products
      </h1>
      {productData?.category !== '' && (
        <div className="flex flex-wrap justify-center ">
          {post.length <= 1 && (
            <div className="text-sm font-bold py-44 ">
              Oops! No Recommendations.
            </div>
          )}
          {post
            .filter((filteredData) => filteredData._id !== id)
            .map((i) => (
              <>
                <Card
                  price={i.cost}
                  name={i.title}
                  tag={i.category}
                  photos={i.photos[0]}
                  status={i.productStatus}
                  creator={i.creator}
                  id={i._id}
                />
              </>
            ))}
        </div>
      )}
      {load && <Loader />}
    </div>
  )
}

export default Product
