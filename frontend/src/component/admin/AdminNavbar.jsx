import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='flex item-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
      <Link to='/'>
      <img src={assets.logo} alt="logo" className='w-36 h-auto py-4'/></Link>
    </div>
  )
}

export default AdminNavbar
