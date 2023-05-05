import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../slices/productSlice'
import { useRouter } from 'next/router'
import Card from '../PredDefinedComponents/Card'
import NoPosts from '../PredDefinedComponents/NoPosts'
import { AiOutlineArrowRight } from 'react-icons/Ai'

const Products = () => {
  const dispatch = useDispatch()

  const [postData, setPostData] = useState([])

  const data = useSelector((state) => state?.posts?.currentPage)
  const post = useSelector((posts) => posts?.posts?.posts)

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
      {post.length <= 0 && currentRoute.includes('home') && (
        <NoPosts heading="Oops! No Products" />
      )}
      {currentRoute.includes('home') && post.length > 0 && (
        <h1
          className="font-bold font-montserrat text-xl md:text-5xl w-full flex justify-start p-5 text-white  drop-shadow-[0_2.5px_2.5px_rgba(240,120,120,1)]"
          id="product"
        >
          All Products
        </h1>
      )}
      <div className={`flex flex-wrap w-screen justify-evenly  `}>
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
            className="flex justify-center decoration-primary hover:underline  items-center text-primary ml-10 md:m-10 "
          >
            View all products &nbsp; <AiOutlineArrowRight />{' '}
          </a>
        )}
      </div>
    </>
  )
}

export default Products
