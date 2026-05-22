import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='container-fluid d-flex justify-content-between'>

        <div>
            <h2>my - app</h2>
        </div>

        <div>
            <NavLink className={({isActive}) => isActive ? "bg-primary text-white text-decoration-none px-3 mx-2" : "bg-light text-decoration-none  mx-2" } to="/">dash-board</NavLink>
            <NavLink className={({isActive}) => isActive ? "bg-primary text-white text-decoration-none px-3 mx-2" : "bg-light text-decoration-none  mx-2" } to="/services">services</NavLink>
            <NavLink className={({isActive}) => isActive ? "bg-primary text-white text-decoration-none px-3 mx-2" : "bg-light text-decoration-none  mx-2" } to="/book-service">book service</NavLink>
            <NavLink className={({isActive}) => isActive ? "bg-primary text-white text-decoration-none px-3 mx-2" : "bg-light text-decoration-none  mx-2" } to="/my-bookings">my bookings</NavLink>
        </div>
    </div>
  )
}

export default Nav