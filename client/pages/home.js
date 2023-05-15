// Components Imports
import Products from '../components/Products/Products'
import Pagination from '../components/Pagination/Pagination'

export default function Marketplace() {
  return (
    <>
      <div className="flex flex-col items-center h-fit min-h-screen py-20 ">
        <Products />
        <Pagination />
      </div>
    </>
  )
}
