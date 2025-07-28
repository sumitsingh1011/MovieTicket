import React from 'react'
import { assets } from '../assets/assets'
import { ClockIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const navigate=useNavigate()
  return (
    <div
      className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36  bg-[url("/image.png")] bg-cover bg-center h-screen'
       // or replace with your actual image path
    >
      <img src={assets.marvelLogo} alt="Marvel Logo" className='max-h-11 lg:h-11 mt-20' />

      <h1 className='text-5xl md:text-[70px] md:leading-[1.2] font-semibold max-w-3xl'>
        Guardians <br />of the Galaxy
      </h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4 h-4' /> 2022
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4 h-4' /> 2h 9m
        </div>
      </div>
      <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga expedita facere molestias debitis sed consequatur quasi aliquid consequuntur nesciunt! Cupiditate ducimus corrupti autem odio labore natus dicta aut possimus neque.</p>
       <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Explore Movies 
          <ArrowRightIcon/>
       </button>
    </div>
  )
}

export default HeroSection
