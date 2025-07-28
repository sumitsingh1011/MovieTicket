import React from 'react'
import Navbar from './component/Navbar'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Seatlayout from './pages/Seatlayout'
import Mybooking from './pages/Mybookings'
import Favorite from './pages/Favorite'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import {Toaster} from 'react-hot-toast'
import Footer from './component/Footer'
import Theater from './pages/Theater'
import Released from './pages/Released'
import Layout from './pages/admin/Layout'
import ListBookings from './pages/admin/ListBookings'
import ListShow from './pages/admin/ListShow'
import AddShow from './pages/admin/AddShow'
import Dashboard from './pages/admin/Dashborad'


function App() {
    const isAdmin =useLocation ().pathname.startsWith('/admin')
   return (
    <>
      {!isAdmin && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movie/:id/:date' element={<Seatlayout/>}/>
        <Route path='/my-bookings' element={<Mybooking/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/newmovies' element={<Released/>}/>
        <Route path='/theater' element={<Theater/>}/>

           <Route path='/admin/*' element={<Layout/>}>
             <Route index element={<Dashboard/>}/>
             <Route path='add-shows' element={<AddShow/>}/>
             <Route path='list-shows' element={<ListShow/>}/>
             <Route path='list-booking' element={<ListBookings/>}/>
           </Route>
        
        
      </Routes>
      {!isAdmin && <Footer/>}
    </>
  )
}

export default App
