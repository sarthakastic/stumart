// Native Imports
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

// Redux Imports
import { searchProducts } from '../../slices/productSlice'

// Icons Imports
import { BiSearchAlt } from 'react-icons/Bi'

const Search = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [search, setSearchData] = useState() // search value

  const [category, setCategory] = useState('') // set category as empty string

  const handleChange = (e) => {
    setSearchData(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    search &&
      dispatch(searchProducts({ search, category })).then(
        router.push('/search')
      )
  }

  return (
    <form className="flex items-center  " onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        required
        placeholder="Search for Products"
        onChange={handleChange}
        className=" border-b-2 border-primary text-primary caret-primary focus:border-0 outline-primary "
      />
      <button
        className=" h-fit w-fit  py-1 px-4 mx-1 font-montserrat  border-2 border-primary hover:text-white hover:bg-primary  text-primary  "
        type="submit"
        placeholder="Search"
      >
        <BiSearchAlt />
      </button>
    </form>
  )
}

export default Search
