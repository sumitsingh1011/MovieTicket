import React, { useEffect, useState } from 'react'
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../component/Loading'
import Title from '../../component/admin/Title'
import BlurCircle from '../../component/BlurCircle'
import { dateformate } from '../../library/dateformate'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
  }, [])

  const dashboardCards = [
    {
      title: 'Total Bookings',
      value: dashboardData.totalBookings || '0',
      icon: ChartLineIcon,
    },
    {
      title: 'Total Revenue',
      value: `${currency} ${dashboardData.totalRevenue || '0'}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: 'Active Shows',
      value: dashboardData.activeShows.length || '0',
      icon: PlayCircleIcon,
    },
    {
      title: 'Total Users',
      value: dashboardData.totalUser || '0',
      icon: UserIcon,
    },
  ]

  if (loading)
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    )

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="px-4 border rounded-md flex items-center justify-between gap-4 py-3 bg-primary/10 border-primary/20 max-w-60 w-full"
            >
              <card.icon className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-semibold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">Active shows</p>

      <div className="relative flex flex-wrap gap-4 mt-6 w-full max-w-screen-xl">
        <BlurCircle top="100px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-56 rounded-lg overflow-hidden h-full bg-primary/10 pb-3 border border-primary/20 hover:-translate-y-2 transition duration-300"
          >
            <img
              src={show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}
                {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>{dateformate(show.showDateTime)}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
