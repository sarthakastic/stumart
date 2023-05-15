// Native Imports
import React from 'react'

// Carousel Splide Dependency imports
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

// Image Imports
import img1 from '../../public/ai.svg'
import img2 from '../../public/carousel.svg'

// Carousel Settings
const Carousel = () => {
  const options = {
    type: 'fade',
    rewind: true,
    width: '80%',
    gap: '1rem',
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    height: '',
    arrows: false,
    rewindByDrag: true,
    padding: '10px',
  }

  return (
    <Splide options={options} aria-label="My Favorite Images">
      <SplideSlide>
        <img className="w-full h-full" src={img1.src} alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
        <img
          className="w-full rounded-2xl h-full"
          src={img2.src}
          alt="Image 2"
        />
      </SplideSlide>
    </Splide>
  )
}

export default Carousel
