import Head from 'next/head'
import Landing from '../components/Landing'
import Products from '../components/Products/Products'
import Carousel from '../components/Carousel/Carousel'
import { AiOutlineArrowRight } from 'react-icons/Ai'
import Category from '../components/Category/Category'
import main from '../public/main.svg'
import Notion from '../components/Notion/Notion'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Stumart</title>
        <meta name="description" content="A website to sell used items." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center h-fit min-h-screen md:py-0 md:pt-14 py-14 ">
        <div className="h-3/4 ">
          <img className="w-screen h-full " src={main.src} alt="" />
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

        <div className="w-screen">
          <Notion />
        </div>
        <Footer />
      </div>
    </>
  )
}
