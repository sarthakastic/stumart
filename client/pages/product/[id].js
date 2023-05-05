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

// Icons Imports
import { FiLogIn } from 'react-icons/Fi'

// Images Imports
import registerIcon from '../../public/register.png'

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
          <div className="bg-transparent border-2 border-ternary h-full p-5 flex items-center justify-center">
            <img
              className="h-[600px] w-full "
              src={productData?.photos}
              alt="product image"
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-h-[720px] md:w-1/2  bg-ternary  p-5">
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
    </div>
  )
}

export default Product
