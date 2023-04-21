import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pagination } from '../../slices/productSlice'

const Pagination = () => {
  const numberOfPages = useSelector((state) => state?.posts?.numberOfPages)
  const [pageNo, setPageNo] = useState(1)

  const dispatch = useDispatch()

  let pages = []
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push({
      key: i,
      value: i,
    })
  }

  pages.map((data) => console.log(data, 'map'))

  const inc = (data) =>
    dispatch(pagination(data)).then(console.log('first')).then(setPageNo(data))

  return (
    <>
      <div className="flex justify-around items-start w-fit gap-1 h-10 ">
        {pages.map((data) => (
          <button
            key={data.key}
            className={`rounded-full p-2 flex border-2 cursor-pointer ${
              pageNo === data?.value ? 'bg-slate-400' : null
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
