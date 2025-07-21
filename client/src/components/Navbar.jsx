import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate= useNavigate()

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-transparent  border-white/10 text-white"
    >
      {/* Logo */}
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.marvelLogo} alt="Logo" className='w-36 h-auto' />
      </Link>

      {/* Nav Links (Desktop + Slide-in for Mobile) */}
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full bg-black/80 md:bg-transparent md:border border-white/20 overflow-hidden backdrop-blur-md transition-[width] duration-300 ${
          isOpen ? 'max-md:w-full' : 'max-md:w-0'
        }`}
      >
        <XIcon
          className='md:hidden absolute top-6 right-6 w-6 h-6   cursor-pointer text-white'
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/'>Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/movies'>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/theaters'>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/release'>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/favorite'>Favorites</Link>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer text-white' />
        {
          !user ? (
            <button
              onClick={openSignIn}
              className='px-4 py-1 sm:px-7 sm:py-2 bg-red-700 hover:bg-red-600 transition rounded-full font-medium text-white cursor-pointer'
            >
              Login
            </button>
          ) : (
            <UserButton>
               <UserButton.MenuItems>
                <UserButton.Action  label='My Booking' labelIcon={<TicketPlus width={15}/>} onClick={()=>{
                    navigate('/my-bookings')
                }}/>
               </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      {/* Hamburger */}
      <MenuIcon
        className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white'
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  )
}

export default Navbar
