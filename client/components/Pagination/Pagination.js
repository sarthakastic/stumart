// Native Imports
import React, { useState } from 'react'

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'

//Slice Imports
import { pagination } from '../../slices/productSlice'

const Pagination = () => {
  const numberOfPages = useSelector((state) => state?.posts?.numberOfPages) // set total number of pages

  const [pageNo, setPageNo] = useState(1) // set the active page number

  const dispatch = useDispatch()

  let pages = [] // list of page numbers

  // add the page numbers inside the list
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push({
      key: i,
      value: i,
    })
  }

  /**
   * This is a JavaScript function that increments the pagination data and sets the page number.
   * @param data - The parameter `data` is being passed to the `inc` function. It is then being used as
   * an argument for the `pagination` function that is being dispatched. The `pagination` function is
   * likely updating some state in the application. Once the dispatch is complete, the
   * `console.log('first
   */
  const inc = (data) =>
    dispatch(pagination(data)).then(console.log('first')).then(setPageNo(data))

  return (
    <>
      <div className="flex justify-around items-start w-fit gap-1 h-10 ">
        {pages.map((data) => (
          <button
            key={data.key}
            className={` p-2 h-8 w-8 flex items-center justify-center border-2 font-semibold text-primary border-primary cursor-pointer ${
              pageNo === data?.value ? 'bg-primary text-white' : null
            } `}
            onClick={() => inc(data?.value)}
          >
            {data.value}{' '}
          </button>
        ))}
      </div>
    </>
  )
}

export default Pagination
