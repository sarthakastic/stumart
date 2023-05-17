// Native Imports
import Head from 'next/head'
import Image from 'next/image'

// Components Imports
import Products from '../components/Products/Products'
import Carousel from '../components/Carousel/Carousel'
import Category from '../components/Category/Category'
import Notion from '../components/Notion/Notion'
import Footer from '../components/Footer/Footer'
import Loader from '../components/PredDefinedComponents/Loader'

// Images Import
import main from '../public/main.svg'
import { useSelector } from 'react-redux'

export default function Home() {
  const load = useSelector((state) => state?.load?.isLoad)

  const error = useSelector((state) => state?.error?.isError)

  return (
    <>
      {/* Meta Data */}
      <Head>
        <title>Stumart</title>
        <meta name="description" content="A website to sell used items." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Landing Page */}
      <div className="flex flex-col items-center h-fit min-h-screen md:py-0 md:pt-14 py-14 ">
        <div className="h-3/4 ">
          <Image
            className="w-screen h-full "
            width={100}
            height={10}
            src={main.src}
            alt=""
          />
        </div>

        <h1 className="font-bold font-montserrat text-xl md:text-5xl w-full flex justify-start p-5 text-white  drop-shadow-[0_2.5px_2.5px_rgba(240,120,120,1)]">
          View products by category
        </h1>
        <div className="pb-5">
          <Category />
        </div>
        <Carousel />
        <h1 className="font-bold font-montserrat text-xl md:text-5xl w-full flex justify-start p-5 text-white  drop-shadow-[0_2.5px_2.5px_rgba(240,120,120,1)]">
          Latest products
        </h1>
        <Products />

        <div className="w-screen mt-5">
          <Notion />
        </div>
        <Footer />
      </div>
      {load && !error && <Loader />}
    </>
  )
}
