import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Head from 'next/head'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import img1 from '../../public/banner1.jpeg'
import img2 from '../../public/banner2.jpeg'

const Carousel = () => {
  const options = {
    type: 'fade',
    rewind: true,
    width: '100%',
    gap: '1rem',
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    height: '25rem',
    arrows: false,
  }

  return (
    <Splide options={options} aria-label="My Favorite Images">
      <SplideSlide>
        <img className="w-full h-full" src={img1.src} alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
        <img className="w-full h-full" src={img2.src} alt="Image 2" />
      </SplideSlide>
    </Splide>
  )
}

export default Carousel
