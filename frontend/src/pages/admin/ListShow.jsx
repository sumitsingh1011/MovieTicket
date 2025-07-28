import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../component/Loading';
import Title from '../../component/admin/Title';
import { dateformate } from '../../library/dateformate';


const ListShow = () => {

    const currency = import.meta.env.VITE_CURRENCY || '₹';
    
    
       const [shows, setshows] = useState([]);
        const [loading, setloading] = useState(true);

        const getShows = async () => {
          try{
            setshows([{
              movie:dummyShowsData[0],
              showDateTime:"345,54,543",
              showPrice:"120", 
                occupiedSeats:{
                A1:  "user_1",
                B1:  "user_2",
                C1: "user_3"
                }
            }])
            setloading(false);
          } catch(err){
            console.log(err);
            
          }
        }
       useEffect(()=>{
        getShows();
       },[])

  return !loading ?(
    <>
      <Title text1="List" text2="Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
         <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
             <tr className='bg-primary/20 text-left text-white'>
                <th className='p-2 font-medium '>Movie Name</th>
                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Total Bookings</th>
                <th className='p-2 font-medium'>Earning</th>
             </tr>
          </thead>
          <tbody>
            {shows.map((show,index)=>(
            <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                <td className='p-2'>{dateformate(show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                <td className='p-2'>{currency}{Object.keys(show.occupiedSeats).length * show.showPrice}</td>
    
              </tr>
            ))}
          </tbody>
         </table>
      </div>
    </>
  ) : 
  <Loading/>
  
}
 
export default ListShow
