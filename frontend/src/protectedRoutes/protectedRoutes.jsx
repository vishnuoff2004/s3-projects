import React, { createContext } from 'react'
import { AuthContext } from '../context-api/authContext'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'

const ProtectedRoutes = () => {
    const {user,isLoading} = useContext(AuthContext)
    console.log(user,isLoading)

    if(isLoading)
    {
        return <div>Loading ...</div>
    }

    if(user?.role == "")
        return <Navigate to="/login" />

    if(user?.role == "user")
        return <Navigate to="/access"/>

    if(user?.role == "admin"){
        return <Outlet/>
    }

}

export default ProtectedRoutes