import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Dashboard from  "../pages/user/dashboard.jsx"
import BookServiceForm from  "../pages/user/bookServiceForm.jsx"
import MyBookings from  "../pages/user/myBookings.jsx"
import Login from "../pages/auth/login.jsx"
import Sign from "../pages/auth/sign.jsx"
import SetServices from "../pages/admin/setServices.jsx";
import ManageServices from "../pages/admin/manageServices.jsx";
import SetProviders from "../pages/admin/setProviders.jsx";
import ProtectedRoutes from "../protectedRoutes/protectedRoutes.jsx";
import Unauthorized from "../pages/unauthorized/unauthorized.jsx";

export default function AppRoutes()
{
    return(
        <>
        <Router>
          <Routes>
            <Route path='/' element ={<Dashboard/>}></Route>
            <Route path='/register' element ={<Sign/>}></Route>
            <Route path='/login' element ={<Login/>}></Route>
            <Route path='/my-bookings' element ={<MyBookings/>}></Route>
            <Route path='/access' element={<Unauthorized/>}></Route>



            <Route element={<ProtectedRoutes/>}>  
              <Route path='/service-provider' element ={<ManageServices/>}></Route>
              <Route path="/services" element={<SetServices/>}></Route>
              <Route path="/set-provider/:id" element={<SetProviders/>}></Route>
            </Route>

          </Routes>
        </Router>
        </>
    )
}