import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Dashboard from  "../pages/user/dashboard.jsx"
import BookServiceForm from  "../pages/user/bookServiceForm.jsx"
import MyBookings from  "../pages/user/myBookings.jsx"
import ServiceList from  "../pages/user/serviceList.jsx"
import Login from "../pages/auth/login.jsx"
import Sign from "../pages/auth/sign.jsx"

export default function AppRoutes()
{
    return(
        <>
        <Router>
          <Routes>
            <Route path='/' element ={<Dashboard/>}></Route>
            <Route path='/register' element ={<Sign/>}></Route>
            <Route path='/login' element ={<Login/>}></Route>
            <Route path='/book-service' element ={<BookServiceForm/>}></Route>
            <Route path='/my-bookings' element ={<MyBookings/>}></Route>
            <Route path='/services' element ={<ServiceList/>}></Route>
          </Routes>
        </Router>
        </>
    )
}