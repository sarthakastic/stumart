import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, getUserProduct } from '../../slices/productSlice'
import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'

const MyProfile = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const data = useSelector((state) => state?.posts)
  console.log(data, 'posts user')

  const [user, setUser] = useState()

  const [postData, setPostData] = useState([])

  const id = router.query.id

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        // behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    const initialUser = storedProfile ? JSON.parse(storedProfile) : null
    setUser(initialUser)
    const page = 1
    dispatch(getUserProduct(id))
      .then((posts) => {
        console.log(posts, 'dispatch')
        setPostData(posts?.payload)
        handleScrollToElement('product')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {console.log(postData, 'myprofilemnx cmnd nc')}
      <div id="product" className="flex flex-wrap justify-center pt-20 ">
        {postData.map((i) => (
          <Card
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
      <Pagination />
    </div>
  )
}

export default MyProfile
