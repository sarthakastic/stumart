import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../slices/productSlice'
import { useRouter } from 'next/router'
import Card from '../PredDefinedComponents/Card'
import { AiOutlineArrowRight } from 'react-icons/Ai'

const Products = () => {
  const dispatch = useDispatch()

  const [postData, setPostData] = useState([])

  const data = useSelector((state) => state?.posts?.currentPage)

  const router = useRouter()
  const currentRoute = router.pathname

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        // behavior: "smooth",
      })
    }
  }

  const checkTokenExpiration = () => {
    const tokenData = localStorage.getItem('profile')
    if (tokenData) {
      const { token, expirationTime } = JSON.parse(tokenData)
      const currentTime = new Date().getTime()

      if (currentTime >= expirationTime) {
        // Token has expired, remove from local storage and take appropriate actions
        localStorage.removeItem('profile')
      }
    }
  }

  useEffect(() => {
    console.log('first')

    checkTokenExpiration()

    dispatch(
      fetchProducts({
        limit: `${currentRoute.includes('home') ? data : 1}`,
        page: `${currentRoute.includes('home') ? 10 : 8}`,
      })
    )
      .then((posts) => {
        setPostData(posts?.payload?.data)
        handleScrollToElement('product')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [data])

  return (
    <>
      {currentRoute.includes('home') && (
        <h1 className="font-bold text-4xl pt-20 text-gray-700" id="product">
          All Products
        </h1>
      )}
      <div className={`flex flex-wrap w-screen justify-center  `}>
        {postData &&
          postData.map((i) => (
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
        {!currentRoute.includes('home') && (
          <a
            href="/home"
            className="flex justify-center  items-center text-gray-400 ml-10 md:m-10 "
          >
            View all products &nbsp; <AiOutlineArrowRight />{' '}
          </a>
        )}
      </div>
    </>
  )
}

export default Products
