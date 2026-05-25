import { NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
   function handleLogOut(){
    localStorage.removeItem("token");
    navigate("/login");
   }
  return (
    <div className='bg-violet-400'>
      <div className='flex justify-content-center items-center py-2'>
      <div className='flex justify-between w-75'>
        <div>
            <h2 className='text-xl font-bold'>my - app</h2>
        </div>

        <div>
            <NavLink className={({isActive}) => isActive ? "text-decoration-underline text-light font-bold px-3 mx-2" : "text-decoration-none text-black  font-bold mx-2" } to="/">dash-board</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-decoration-underline text-light font-bold px-3 mx-2" : "text-decoration-none text-black  font-bold mx-2" }  to="/services">services</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-decoration-underline text-light font-bold px-3 mx-2" : "text-decoration-none text-black  font-bold mx-2" }  to="/book-service">book service</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-decoration-underline text-light font-bold px-3 mx-2" : "text-decoration-none text-black  font-bold mx-2" }  to="/my-bookings">my bookings</NavLink>
        </div>

        <div className='bg-red-500 p-1 px-3 rounded-sm hover:bg-red-700'>
          <button className='font-bold text-light' onClick={()=>handleLogOut()}>log-out</button>
        </div>
    </div>
      </div>
    </div>

  )
}

export default Nav