import React, { useEffect, useState } from 'react'
import Loading from '../../component/Loading';
import Title from '../../component/admin/Title';
import { dummyBookingData } from '../../assets/assets';
import { dateformate } from '../../library/dateformate';



const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY || '₹';
      
        
         const [Booking, setBooking] = useState([]);
          const [loading, setloading] = useState(true);

          const getallBooking = async () => {
                    setBooking(dummyBookingData);
                    setloading(false)
                  }
                 useEffect(()=>{
                  getallBooking();
                 },[])
  

  return !loading ?(
    <>
      <Title text1="List" text2="Booking" />
       <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
             <tr className='bg-primary/20 text-left text-white'>
                  <th className='p-2 font-medium'>User Name</th>
                <th className='p-2 font-medium '>Movie Name</th>
                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Seats</th>
                <th className='p-2 font-medium'>Amount</th>
             </tr>
          </thead>
          <tbody>
                      {Booking.map((item,index)=>(
                        <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                          <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                          <td className='p-2'>{(item.show.movie.title)}</td>
                          <td className='p-2'>{dateformate(item.show.showDateTime)}</td>
                          <td className='p-2'>{Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(", ")}</td>
                          <td className='p-2'>{currency}{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
        </table>
       </div>
    </>
  ) : 
  <Loading/>
}

export default ListBookings
