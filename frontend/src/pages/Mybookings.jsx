import React, { useState,useEffect } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../component/Loading'
import BlurCircle from '../component/BlurCircle'
import timeformat from '../library/Timeformate'
import { dateformate } from '../library/dateformate'

const Mybookings= () => {

   const currency= import.meta.env.VITE_CURRENCY
   const [bookings, setBookings] = useState([])
   const [loading, setLoading] = useState(true)

   const getMybooking = async () => {
     setBookings(dummyBookingData)
     setLoading(false)
   }
   useEffect(()=>{
      getMybooking()
   },[])

  return !loading ?(
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px"/>
       <div>
        <BlurCircle bottom="0px" left="600px"/>
       </div>
      <h1 className='text-lg font-semibold md-4'>My Booking</h1>
        {bookings.map((item,index)=>(
          <div key={index} className='flex flex-col justify-between md:flex-row bg-primary/8 border border-primary/20 rounded -lg mt-4 p-2 max-w-3xl'>
            <div className='flex flex-col md:flex-row'>
             <img src={item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
             <div className='flex flex-col p-4'>
                <p className=' text-lg font-semibold'> {item.show.movie.title}</p>
                <p className='text-gray-400 text-sm'>{timeformat(item.show.movie.runtime)}</p>
                <p className='text-gray-400 text-sm mt-auto'>{dateformate(item.show.showDateTime)}</p>
             </div>
              
              <div className='flex flex-col justify-between md:text-right p-4 md:items-end'  >
                   <div className='flex items-center gap-4'>
                    <p className='text-2xl font-semibold md-3'>{currency}{item.amount}</p>
                    {!item.ispaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-mediun cursor-pointer '>Pay Now</button>}
                   </div>
                   <div className='text-sm'>
                    <p><span className='text-gray-400'>Total Tickets:</span>{item.bookedSeats.length}</p> 
                    <p><span className='text-gray-400'>Booked Seats:</span>{item.bookedSeats.join(", ")}</p> 
                    </div>
              </div>

            </div>
          </div>
        ))}
     </div>
  ) : <Loading/>
}

export default Mybookings
