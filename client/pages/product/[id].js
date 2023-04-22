import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../slices/productSlice'
import { getAddress } from '../../slices/addressSlice'
import { searchProducts } from '../../slices/productSlice'
import Button from '../../components/PredDefinedComponents/Button'
import Card from '../../components/Card/Card'
import { FiLogIn } from 'react-icons/Fi'

const Product = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const post = useSelector((posts) => posts?.posts?.posts)

  const [search, setSearchData] = useState('')
  const [category, setCategory] = useState('')
  const [user, setUser] = useState()
  const [address, setAddress] = useState([])
  const [productData, setProductData] = useState({
    title: '',
    cost: NaN,
    details: '',
    photos: '',
    category: '',
    creator: '',
  })

  const { id } = router.query

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
  }, [])

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

  useEffect(() => {
    productData?.category && setCategory(productData?.category)
    console.log(category, 'category')
  }, [productData?.category])

  useEffect(() => {
    console.log(category)
    category !== '' && dispatch(searchProducts({ search, category }))
  }, [category])

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

  const register = () => {
    router.push('/register')
  }

  if (!user?.result?.name) {
    return (
      <div className="h-screen bg-gray-500 flex flex-col justify-center items-center">
        <h1 className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
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
    <div className="flex flex-col justify-center items-center bg-gray-400 h-fit  min-h-screen md:min-h-[920px] py-20 px-2 md:p-20">
      <div className="rounded-2xl w-full h-full m-5 border-2 flex flex-col md:flex-row items-center  p-2 border-gray-500 bg-white ">
        <img
          className="w-28 md:w-72 h-full rounded-2xl "
          src={productData?.photos}
          alt="product image"
        />
        <div className="flex flex-col w-full m-2 bg-gray-400 rounded-2xl border-2 border-gray-900 justify-evenly px-2">
          <p className="px2 ">
            {' '}
            <span> Title : </span> <br /> {productData?.title}
          </p>
          <p className="px-2">
            {' '}
            <span> Price : </span> <br /> Rs.{productData?.cost}/-
          </p>
          <p className="px-2 ">
            {' '}
            <span> Details : </span> <br /> {productData?.details}
          </p>

          <p className="  ">
            {' '}
            <span> Category : </span> <br /> {productData?.category}
          </p>
          {address && (
            <>
              <p className="px-2">
                {' '}
                <span> Name : </span> <br /> {address?.name}{' '}
              </p>
              <p className="px-2">
                {' '}
                <span> Hostel : </span> <br />
                {address?.hostel}{' '}
              </p>
              <p className="px-2">
                {' '}
                <span> Floor : </span> <br /> {address?.floor}{' '}
              </p>
              <p className="px-2">
                {' '}
                <span> Room No. : </span> <br /> {address?.room}{' '}
              </p>
              <p className="px-2">
                {' '}
                <span> Contact Number : </span> <br /> {address?.contact}{' '}
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
      <div className="text-4xl flex justify-center items-center text-center my-4 font-bold text-gray-700 ">
        Recommended Products
      </div>
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
    </div>
  )
}

export default Product
