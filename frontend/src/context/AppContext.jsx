// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
 
// axios.defaults.baseURL =import.meta.env.VITE_BASE_URL

 
//  export const AppContext =createContext()
//  export const AppProvider = ({ children }) => {

//     const [Admin ,setAdmin] =useState(false)
//     const [Show ,setShow] =useState([])
//     const [Favorite ,setFavorite] =useState([])

//     const {user}= useUser()
//     const {getToken} = useAuth()
//     const location =useLocation()
//     const navigate=useNavigate()
 


//     const fetchAdmin =async( )=>{
//         try {
//             const {data} = await axios.get('/api/admin/is-admin',{headers:{Authorization : `Bearer ${await getToken()}`}})
//             setAdmin(data.Admin)
//             if(!data.Admin && location.pathname.startsWith('/admin  ')){
//                 navigate('/')
//                 toast.error('NOT ACCESSABLE')
//             }
//     }
//     catch (error){
//       console.error(error);
//       }
//     }
     
//     const fetchShow = async ()=> {
//         try {
//             const {data}=await axios.get('/api/show/all')
//              if(data.success){
//                 setAdmin(data.shows)
//              } 
//              else{
//                 toast.error(data.meggage)
//              }
//         } catch (error) {
//             console.error(error);
            
//         }
//     }

//     const fetchFavMOvie = async ()=> {
//          try {
//              const{data} =await axios.get('/api/user/favorites',{headers:{Authorization : `Bearer ${await getToken()}`}})
//               if(data.success){
//                 setFavorite(data.movies)
//              } 
//              else{
//                 toast.error(data.meggage)
//              }
//          } catch (error) {
//             console.error(error);
            
//          }
//     }

//     useEffect(()=>{
//          fetchShow()
        
//         },[])

//     useEffect(()=>{
//         if(user){
//             fetchAdmin()
//             fetchFavMOvie
//         }
//         },[user])

//     const value={axios,
//         fetchAdmin,
//         getToken,
//         user,
//         Admin,
//         navigate,
//         Favorite,
//         fetchFavMOvie,
//         setAdmin,
//         Show
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
//  }
 

//  export const useAppContext =() =>{
//      useContext(AppContext)
//  }