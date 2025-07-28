import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon,
} from 'lucide-react'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {
  const User = {
    firstName: 'Sumit',
    lastName: 'Singh',
    imageUrl: assets?.profile || '',
  }

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Booking', path: '/admin/list-booking', icon: ListCollapseIcon },
  ]

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-full md:w-60 border-r border-gray-300/20 text-sm">
      <img className="h-14 w-14 rounded-full mx-auto" src={User.imageUrl} alt="sideimg" />
      <p className="mt-2 text-base max-md:hidden">
        {User.firstName} {User.lastName}
      </p>

      <div className="w-full">
        {adminLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 px-4 mt-4 text-gray-400 hover:bg-gray-100 ${
                isActive ? 'bg-primary/15 text-primary font-semibold' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-l-full right-0 absolute bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
